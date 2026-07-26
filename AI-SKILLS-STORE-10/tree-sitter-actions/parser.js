const Parser = require('tree-sitter');
const Actions = require('./bindings/node');
const fs = require('fs');
const path = require('path');

class ActionsParser {
  constructor() {
    this.parser = new Parser();
    this.parser.setLanguage(Actions);
    this.generatedIdCounter = 0;
  }

  parseFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const tree = this.parser.parse(content);
    return this.convertToSchema(tree, content);
  }

  convertToSchema(tree, sourceCode) {
    const actions = {};
    const rootActions = [];
    let order = 0;

    const rootNode = tree.rootNode;

    // Process each root action
    for (let i = 0; i < rootNode.childCount; i++) {
      const child = rootNode.child(i);
      if (child.type === 'root_action') {
        const actionData = this.parseAction(child, sourceCode, null, 0, order++);
        const actionId = actionData.id || actionData.generated_id;
        actions[actionId] = actionData;
        rootActions.push(actionId);

        // Process children recursively
        this.processChildren(child, sourceCode, actionId, actions);
      }
    }

    return {
      actions,
      root_actions: rootActions
    };
  }

  processChildren(parentNode, sourceCode, parentId, actions) {
    // Look for child_action_list
    const childActionList = this.findChildByType(parentNode, 'child_action_list');
    if (childActionList) {
      this.processActionList(childActionList, sourceCode, parentId, 1, actions);
    }
  }

  processActionList(actionListNode, sourceCode, parentId, depth, actions) {
    let order = 0;
    const childIds = [];

    for (let i = 0; i < actionListNode.childCount; i++) {
      const child = actionListNode.child(i);
      if (this.isActionNode(child)) {
        const actionData = this.parseAction(child, sourceCode, parentId, depth, order++);
        const actionId = actionData.id || actionData.generated_id;
        actions[actionId] = actionData;
        childIds.push(actionId);

        // Process nested children
        this.processNestedChildren(child, sourceCode, actionId, depth, actions);
      }
    }

    // Update parent's children array
    if (parentId && actions[parentId]) {
      actions[parentId].children = childIds;
    }
  }

  processNestedChildren(actionNode, sourceCode, parentId, currentDepth, actions) {
    const nextDepth = currentDepth + 1;
    let listType;

    switch (currentDepth) {
      case 1:
        listType = 'grandchild_action_list';
        break;
      case 2:
        listType = 'great_grandchild_action_list';
        break;
      case 3:
        listType = 'double_great_grandchild_action_list';
        break;
      case 4:
        listType = 'leaf_action_list';
        break;
      default:
        return; // Max depth reached
    }

    const childList = this.findChildByType(actionNode, listType);
    if (childList) {
      this.processActionList(childList, sourceCode, parentId, nextDepth, actions);
    }
  }

  parseAction(actionNode, sourceCode, parentId, depth, order) {
    const coreAction = this.findChildByType(actionNode, 'core_action');
    if (!coreAction) {
      throw new Error('No core_action found in action node');
    }

    const action = {
      depth,
      state: this.parseState(coreAction, sourceCode),
      name: this.parseName(coreAction, sourceCode),
      parent_id: parentId,
      children: [],
      order
    };

    // Parse optional fields
    const description = this.parseDescription(coreAction, sourceCode);
    if (description) action.description = description;

    const priority = this.parsePriority(coreAction, sourceCode);
    if (priority !== null) action.priority = priority;

    const story = this.parseStory(actionNode, sourceCode);
    if (story) action.story = story;

    const contexts = this.parseContexts(coreAction, sourceCode);
    if (contexts.length > 0) action.contexts = contexts;

    const dateTime = this.parseDateTime(coreAction, sourceCode);
    if (dateTime.do_date) action.do_date = dateTime.do_date;
    if (dateTime.do_time) action.do_time = dateTime.do_time;
    if (dateTime.duration) action.duration = dateTime.duration;

    const completedDateTime = this.parseCompletedDateTime(coreAction, sourceCode);
    if (completedDateTime.completed_date) action.completed_date = completedDateTime.completed_date;
    if (completedDateTime.completed_time) action.completed_time = completedDateTime.completed_time;

    const id = this.parseId(coreAction, sourceCode);
    if (id) {
      action.id = id;
    } else {
      action.generated_id = `generated_${this.generatedIdCounter++}`;
    }

    return action;
  }

  parseState(coreAction, sourceCode) {
    const stateNode = this.findChildByType(coreAction, 'state');
    if (!stateNode) return ' ';

    for (let i = 0; i < stateNode.childCount; i++) {
      const child = stateNode.child(i);
      switch (child.type) {
        case 'not_started':
          return ' ';
        case 'completed':
          return 'x';
        case 'in_progress':
          return '-';
        case 'blocked':
          return '=';
        case 'cancelled':
          return '_';
      }
    }
    return ' ';
  }

  parseName(coreAction, sourceCode) {
    const nameNode = this.findChildByType(coreAction, 'name');
    if (!nameNode) throw new Error('Name is required');
    return this.getNodeText(nameNode, sourceCode).trim();
  }

  parseDescription(coreAction, sourceCode) {
    const descNode = this.findChildByType(coreAction, 'description');
    if (!descNode) return null;

    const descTextNode = this.findChildByType(descNode, 'description_text');
    if (!descTextNode) return null;

    return this.getNodeText(descTextNode, sourceCode).trim();
  }

  parsePriority(coreAction, sourceCode) {
    const priorityNode = this.findChildByType(coreAction, 'priority');
    if (!priorityNode) return null;

    const priorityNumNode = this.findChildByType(priorityNode, 'priority_number');
    if (!priorityNumNode) return null;

    return parseInt(this.getNodeText(priorityNumNode, sourceCode));
  }

  parseStory(actionNode, sourceCode) {
    const storyNode = this.findChildByType(actionNode, 'story');
    if (!storyNode) return null;

    const storyNameNode = this.findChildByType(storyNode, 'story_name');
    if (!storyNameNode) return null;

    return this.getNodeText(storyNameNode, sourceCode).trim();
  }

  parseContexts(coreAction, sourceCode) {
    const contextListNode = this.findChildByType(coreAction, 'context_list');
    if (!contextListNode) return [];

    const contexts = [];
    for (let i = 0; i < contextListNode.childCount; i++) {
      const child = contextListNode.child(i);
      if (child.type === 'middle_context') {
        const contextTextNode = this.findChildByType(child, 'context_text');
        if (contextTextNode) {
          contexts.push(this.getNodeText(contextTextNode, sourceCode));
        }
      } else if (child.type === 'tail_context') {
        contexts.push(this.getNodeText(child, sourceCode));
      }
    }
    return contexts;
  }

  parseDateTime(coreAction, sourceCode) {
    const result = {};
    const doDateNode = this.findChildByType(coreAction, 'do_date_or_time');
    if (!doDateNode) return result;

    const extendedDateTime = this.findChildByType(doDateNode, 'extended_date_and_time');
    if (!extendedDateTime) return result;

    const dateTimeNode = this.findChildByType(extendedDateTime, 'date_and_time');
    if (dateTimeNode) {
      const dateNode = this.findChildByType(dateTimeNode, 'date');
      if (dateNode) {
        result.do_date = this.getNodeText(dateNode, sourceCode);
      }

      const timeNode = this.findChildByType(dateTimeNode, 'time');
      if (timeNode) {
        result.do_time = this.getNodeText(timeNode, sourceCode);
      }
    }

    const durationNode = this.findChildByType(extendedDateTime, 'duration');
    if (durationNode) {
      const durationValueNode = this.findChildByType(durationNode, 'duration_value');
      if (durationValueNode) {
        result.duration = parseInt(this.getNodeText(durationValueNode, sourceCode));
      }
    }

    return result;
  }

  parseCompletedDateTime(coreAction, sourceCode) {
    const result = {};
    const completedDateNode = this.findChildByType(coreAction, 'completed_date');
    if (!completedDateNode) return result;

    const dateTimeNode = this.findChildByType(completedDateNode, 'date_and_time');
    if (dateTimeNode) {
      const dateNode = this.findChildByType(dateTimeNode, 'date');
      if (dateNode) {
        result.completed_date = this.getNodeText(dateNode, sourceCode);
      }

      const timeNode = this.findChildByType(dateTimeNode, 'time');
      if (timeNode) {
        result.completed_time = this.getNodeText(timeNode, sourceCode);
      }
    }

    return result;
  }

  parseId(coreAction, sourceCode) {
    const idNode = this.findChildByType(coreAction, 'id');
    if (!idNode) return null;

    const uuidNode = this.findChildByType(idNode, 'uuid');
    if (!uuidNode) return null;

    return this.getNodeText(uuidNode, sourceCode);
  }

  findChildByType(node, type) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i);
      if (child.type === type) {
        return child;
      }
    }
    return null;
  }

  isActionNode(node) {
    return ['child_action', 'grandchild_action', 'great_grandchild_action',
      'double_great_grandchild_action', 'leaf_action'
    ].includes(node.type);
  }

  getNodeText(node, sourceCode) {
    return sourceCode.slice(node.startIndex, node.endIndex);
  }
}

// Main execution
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node parser.js <path-to-actions-file>');
    process.exit(1);
  }

  try {
    const parser = new ActionsParser();
    const result = parser.parseFile(filePath);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error parsing file:', error.message);
    process.exit(1);
  }
}

module.exports = ActionsParser;
module.exports.ActionsParser = ActionsParser;
module.exports.default = ActionsParser;
