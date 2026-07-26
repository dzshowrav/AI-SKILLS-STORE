
## Me

> Context:
> - <file>action_specification.md</file>

help me create an OWL ontology that will help me codify these standards for the action class and how we would ultimately translate this into data and a schema

## CodeCompanion (Anthropic)

### Reasoning

The user has provided a detailed specification for an "actions" filetype and wants me to create an OWL ontology that codifies the standards for the action class and how to translate this into data.

Let me analyze the key components from the specification:

1. **Core Structure**: Actions have required fields (depth, state, name) and optional fields (description, priority, story/project, context, do-date/time, completed date, id)

2. **Hierarchy**: Actions can have children (up to 5 levels deep) using `>` characters

3. **States**: Not Started, Completed, In-Progress, Blocked/Awaiting, Cancelled

4. **Temporal aspects**: Do-dates/times, durations, recurrence patterns, completion dates

5. **Organization**: Projects/stories, contexts, priorities

6. **Alignment**: They mention alignment with schema.org Action and Thing

7. **Identification**: UUID v7 for unique identification, but name as secondary key

Let me create an OWL ontology that captures these concepts:

1. First, I'll define the main classes
2. Then the properties (object and data properties)
3. Define the states as individuals or a separate class
4. Handle the temporal aspects
5. Handle the hierarchical relationships
6. Align with schema.org where possible

I should structure this as a proper OWL ontology with:
- Proper namespaces
- Class definitions
- Property definitions
- Domain/range restrictions
- Cardinality constraints where appropriate
- Alignment with schema.org

### Response

I'll help you create an OWL ontology that codifies the actions specification. Based on your requirements, I'll structure this to align with schema.org while capturing all the specific features of your actions format.

### Plan:
1. Define the core ontology structure with namespaces
2. Create the main Action class hierarchy
3. Define temporal properties for dates, durations, and recurrence
4. Model the state system and priorities
5. Handle hierarchical relationships and contexts
6. Align with schema.org Action/Thing classes

Here's the OWL ontology:

````turtle
# filepath: actions-ontology.owl
@prefix : <http://example.org/actions-ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix schema: <http://schema.org/> .
@prefix time: <http://www.w3.org/2006/time#> .

<http://example.org/actions-ontology> rdf:type owl:Ontology ;
    rdfs:label "Actions Ontology" ;
    rdfs:comment "OWL ontology for the .actions filetype specification" ;
    owl:versionInfo "1.1.1" .

#################################################################
#    Classes
#################################################################

### Core Action Class (aligned with schema.org)
:Action rdf:type owl:Class ;
    rdfs:subClassOf schema:Action ;
    rdfs:label "Action" ;
    rdfs:comment "An action from a .actions file, extending schema.org Action" .

### Action States
:ActionState rdf:type owl:Class ;
    rdfs:label "Action State" ;
    rdfs:comment "The current state of an action" .

:NotStarted rdf:type :ActionState ;
    rdfs:label "Not Started" ;
    rdfs:comment "Action has not been started yet" .

:Completed rdf:type :ActionState ;
    rdfs:label "Completed" ;
    rdfs:comment "Action has been completed" .

:InProgress rdf:type :ActionState ;
    rdfs:label "In Progress" ;
    rdfs:comment "Action is currently being worked on" .

:Blocked rdf:type :ActionState ;
    rdfs:label "Blocked/Awaiting" ;
    rdfs:comment "Action is blocked or awaiting something" .

:Cancelled rdf:type :ActionState ;
    rdfs:label "Cancelled" ;
    rdfs:comment "Action has been cancelled" .

### Projects/Stories
:Project rdf:type owl:Class ;
    rdfs:subClassOf schema:Project ;
    rdfs:label "Project" ;
    rdfs:comment "A project or story that groups related actions" .

### Context
:Context rdf:type owl:Class ;
    rdfs:label "Context" ;
    rdfs:comment "A context in which an action can be performed (GTD-style)" .

### Recurrence Pattern
:RecurrencePattern rdf:type owl:Class ;
    rdfs:label "Recurrence Pattern" ;
    rdfs:comment "Defines how an action repeats over time" .

:Frequency rdf:type owl:Class ;
    rdfs:label "Frequency" ;
    rdfs:comment "The frequency of recurrence" .

:Daily rdf:type :Frequency ;
    rdfs:label "Daily" .

:Weekly rdf:type :Frequency ;
    rdfs:label "Weekly" .

:Monthly rdf:type :Frequency ;
    rdfs:label "Monthly" .

:Yearly rdf:type :Frequency ;
    rdfs:label "Yearly" .

:Custom rdf:type :Frequency ;
    rdfs:label "Custom" .

#################################################################
#    Object Properties
#################################################################

### Hierarchical relationships
:hasChild rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :Action ;
    rdfs:label "has child" ;
    rdfs:comment "Relates a parent action to its child actions" .

:hasParent rdf:type owl:ObjectProperty ;
    owl:inverseOf :hasChild ;
    rdfs:domain :Action ;
    rdfs:range :Action ;
    rdfs:label "has parent" ;
    rdfs:comment "Relates a child action to its parent action" .

### State relationship
:hasState rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :ActionState ;
    rdfs:label "has state" ;
    rdfs:comment "The current state of the action" ;
    rdf:type owl:FunctionalProperty .

### Project relationship
:belongsToProject rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :Project ;
    rdfs:label "belongs to project" ;
    rdfs:comment "Associates an action with a project or story" .

### Context relationships
:hasContext rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :Context ;
    rdfs:label "has context" ;
    rdfs:comment "Associates an action with one or more contexts" .

### Recurrence relationship
:hasRecurrence rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :RecurrencePattern ;
    rdfs:label "has recurrence" ;
    rdfs:comment "Associates an action with a recurrence pattern" .

:hasFrequency rdf:type owl:ObjectProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range :Frequency ;
    rdfs:label "has frequency" ;
    rdfs:comment "The frequency of the recurrence pattern" .

#################################################################
#    Data Properties
#################################################################

### Core required properties
:actionName rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:name ;
    rdfs:domain :Action ;
    rdfs:range xsd:string ;
    rdfs:label "action name" ;
    rdfs:comment "The name/title of the action" ;
    rdf:type owl:FunctionalProperty .

:depth rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:nonNegativeInteger ;
    rdfs:label "depth" ;
    rdfs:comment "The depth level of the action (0-5)" ;
    rdf:type owl:FunctionalProperty .

### Optional descriptive properties
:description rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:description ;
    rdfs:domain :Action ;
    rdfs:range xsd:string ;
    rdfs:label "description" ;
    rdfs:comment "Extended description of the action" .

:priority rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "priority" ;
    rdfs:comment "Priority level of the action (Eisenhower matrix)" ;
    rdf:type owl:FunctionalProperty .

### Temporal properties
:doDate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:date ;
    rdfs:label "do date" ;
    rdfs:comment "The date when the action should be done" ;
    rdf:type owl:FunctionalProperty .

:doDateTime rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:dateTime ;
    rdfs:label "do date time" ;
    rdfs:comment "The date and time when the action should be done" ;
    rdf:type owl:FunctionalProperty .

:doTime rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:time ;
    rdfs:label "do time" ;
    rdfs:comment "The time when the action should be done" ;
    rdf:type owl:FunctionalProperty .

:duration rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:duration ;
    rdfs:label "duration" ;
    rdfs:comment "Expected duration of the action in ISO 8601 format" ;
    rdf:type owl:FunctionalProperty .

:durationMinutes rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "duration in minutes" ;
    rdfs:comment "Expected duration of the action in minutes" ;
    rdf:type owl:FunctionalProperty .

:completedDate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:date ;
    rdfs:label "completed date" ;
    rdfs:comment "The date when the action was completed" ;
    rdf:type owl:FunctionalProperty .

:completedDateTime rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:dateTime ;
    rdfs:label "completed date time" ;
    rdfs:comment "The date and time when the action was completed" ;
    rdf:type owl:FunctionalProperty .

### Identification
:actionId rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:identifier ;
    rdfs:domain :Action ;
    rdfs:range xsd:string ;
    rdfs:label "action ID" ;
    rdfs:comment "UUID v7 identifier for the action" ;
    rdf:type owl:FunctionalProperty .

### Project/Story properties
:projectName rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:name ;
    rdfs:domain :Project ;
    rdfs:range xsd:string ;
    rdfs:label "project name" ;
    rdfs:comment "The name of the project or story" ;
    rdf:type owl:FunctionalProperty .

### Context properties
:contextName rdf:type owl:DatatypeProperty ;
    rdfs:domain :Context ;
    rdfs:range xsd:string ;
    rdfs:label "context name" ;
    rdfs:comment "The name of the context" ;
    rdf:type owl:FunctionalProperty .

### Recurrence properties
:recurrenceRule rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "recurrence rule" ;
    rdfs:comment "RRULE string following RFC 5545" .

:endDate rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:date ;
    rdfs:label "end date" ;
    rdfs:comment "End date for the recurrence pattern" .

:interval rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "interval" ;
    rdfs:comment "Interval between recurrences (default 1)" .

:count rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "count" ;
    rdfs:comment "Maximum number of recurrences" .

### Recurrence constraint properties
:byMinute rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by minute" ;
    rdfs:comment "Comma-separated list of minutes (0-59)" .

:byHour rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by hour" ;
    rdfs:comment "Comma-separated list of hours (0-23)" .

:byDay rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by day" ;
    rdfs:comment "Comma-separated list of weekdays" .

:byMonthDay rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by month day" ;
    rdfs:comment "Comma-separated list of month days (1-31, -31 to -1)" .

:byMonth rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by month" ;
    rdfs:comment "Comma-separated list of months (1-12)" .

#################################################################
#    Constraints and Rules
#################################################################

### Depth constraint (max 5 levels)
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :depth ;
    owl:maxInclusive 5
] .

### Priority constraint (positive integers)
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :priority ;
    owl:minInclusive 1
] .

### State is required
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :hasState ;
    owl:cardinality 1
] .

### Name is required
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :actionName ;
    owl:cardinality 1
] .

### Only root actions can belong to projects
[ rdf:type owl:Class ;
  owl:intersectionOf (
    :Action
    [ rdf:type owl:Restriction ;
      owl:onProperty :hasParent ;
      owl:minCardinality 1
    ]
  )
] rdfs:subClassOf [
  rdf:type owl:Restriction ;
  owl:onProperty :belongsToProject ;
  owl:cardinality 0
] .

#################################################################
#    Individuals (State instances)
#################################################################

:notStartedState rdf:type :NotStarted ;
    rdfs:label "Default Not Started State" .

:completedState rdf:type :Completed ;
    rdfs:label "Default Completed State" .

:inProgressState rdf:type :InProgress ;
    rdfs:label "Default In Progress State" .

:blockedState rdf:type :Blocked ;
    rdfs:label "Default Blocked State" .

:cancelledState rdf:type :Cancelled ;
    rdfs:label "Default Cancelled State" .
````

This ontology provides:

### **Key Features:**
1. **Schema.org alignment**: Actions extend `schema:Action` and `schema:Thing`
2. **Complete state model**: All five action states as defined in your spec
3. **Hierarchical support**: Parent-child relationships with depth constraints
4. **Temporal modeling**: Full ISO 8601 date/time support with recurrence patterns
5. **Project organization**: Projects that can contain multiple root actions
6. **Context support**: GTD-style contexts for actions
7. **Priority system**: Integer-based priority supporting Eisenhower matrix

### **Next Steps:**
Would you like me to create example RDF data showing how actual .actions file entries would be represented using this ontology, or would you prefer to refine any particular aspect of the ontology structure first?

## Me

> Context:
> - <file>action_specification.md</file>

first put this in the docs then yes go ahead and put some examples in the examples folder

## CodeCompanion (Anthropic)

### Reasoning

The user wants me to:
1. Put the OWL ontology in a docs folder 
2. Then create examples in an examples folder showing how actual .actions file entries would be represented using this ontology

I'll need to create the file structure they're asking for. First I'll put the ontology in docs/, then create examples showing how to translate from the .actions format to RDF using this ontology.

### Response

I'll organize this properly in your project structure. First, let me put the ontology in the docs folder:

````turtle
// filepath: docs/actions-ontology.owl
@prefix : <http://example.org/actions-ontology#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix schema: <http://schema.org/> .
@prefix time: <http://www.w3.org/2006/time#> .

<http://example.org/actions-ontology> rdf:type owl:Ontology ;
    rdfs:label "Actions Ontology" ;
    rdfs:comment "OWL ontology for the .actions filetype specification" ;
    owl:versionInfo "1.1.1" .

#################################################################
#    Classes
#################################################################

### Core Action Class (aligned with schema.org)
:Action rdf:type owl:Class ;
    rdfs:subClassOf schema:Action ;
    rdfs:label "Action" ;
    rdfs:comment "An action from a .actions file, extending schema.org Action" .

### Action States
:ActionState rdf:type owl:Class ;
    rdfs:label "Action State" ;
    rdfs:comment "The current state of an action" .

:NotStarted rdf:type :ActionState ;
    rdfs:label "Not Started" ;
    rdfs:comment "Action has not been started yet" .

:Completed rdf:type :ActionState ;
    rdfs:label "Completed" ;
    rdfs:comment "Action has been completed" .

:InProgress rdf:type :ActionState ;
    rdfs:label "In Progress" ;
    rdfs:comment "Action is currently being worked on" .

:Blocked rdf:type :ActionState ;
    rdfs:label "Blocked/Awaiting" ;
    rdfs:comment "Action is blocked or awaiting something" .

:Cancelled rdf:type :ActionState ;
    rdfs:label "Cancelled" ;
    rdfs:comment "Action has been cancelled" .

### Projects/Stories
:Project rdf:type owl:Class ;
    rdfs:subClassOf schema:Project ;
    rdfs:label "Project" ;
    rdfs:comment "A project or story that groups related actions" .

### Context
:Context rdf:type owl:Class ;
    rdfs:label "Context" ;
    rdfs:comment "A context in which an action can be performed (GTD-style)" .

### Recurrence Pattern
:RecurrencePattern rdf:type owl:Class ;
    rdfs:label "Recurrence Pattern" ;
    rdfs:comment "Defines how an action repeats over time" .

:Frequency rdf:type owl:Class ;
    rdfs:label "Frequency" ;
    rdfs:comment "The frequency of recurrence" .

:Daily rdf:type :Frequency ;
    rdfs:label "Daily" .

:Weekly rdf:type :Frequency ;
    rdfs:label "Weekly" .

:Monthly rdf:type :Frequency ;
    rdfs:label "Monthly" .

:Yearly rdf:type :Frequency ;
    rdfs:label "Yearly" .

:Custom rdf:type :Frequency ;
    rdfs:label "Custom" .

#################################################################
#    Object Properties
#################################################################

### Hierarchical relationships
:hasChild rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :Action ;
    rdfs:label "has child" ;
    rdfs:comment "Relates a parent action to its child actions" .

:hasParent rdf:type owl:ObjectProperty ;
    owl:inverseOf :hasChild ;
    rdfs:domain :Action ;
    rdfs:range :Action ;
    rdfs:label "has parent" ;
    rdfs:comment "Relates a child action to its parent action" .

### State relationship
:hasState rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :ActionState ;
    rdfs:label "has state" ;
    rdfs:comment "The current state of the action" ;
    rdf:type owl:FunctionalProperty .

### Project relationship
:belongsToProject rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :Project ;
    rdfs:label "belongs to project" ;
    rdfs:comment "Associates an action with a project or story" .

### Context relationships
:hasContext rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :Context ;
    rdfs:label "has context" ;
    rdfs:comment "Associates an action with one or more contexts" .

### Recurrence relationship
:hasRecurrence rdf:type owl:ObjectProperty ;
    rdfs:domain :Action ;
    rdfs:range :RecurrencePattern ;
    rdfs:label "has recurrence" ;
    rdfs:comment "Associates an action with a recurrence pattern" .

:hasFrequency rdf:type owl:ObjectProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range :Frequency ;
    rdfs:label "has frequency" ;
    rdfs:comment "The frequency of the recurrence pattern" .

#################################################################
#    Data Properties
#################################################################

### Core required properties
:actionName rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:name ;
    rdfs:domain :Action ;
    rdfs:range xsd:string ;
    rdfs:label "action name" ;
    rdfs:comment "The name/title of the action" ;
    rdf:type owl:FunctionalProperty .

:depth rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:nonNegativeInteger ;
    rdfs:label "depth" ;
    rdfs:comment "The depth level of the action (0-5)" ;
    rdf:type owl:FunctionalProperty .

### Optional descriptive properties
:description rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:description ;
    rdfs:domain :Action ;
    rdfs:range xsd:string ;
    rdfs:label "description" ;
    rdfs:comment "Extended description of the action" .

:priority rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "priority" ;
    rdfs:comment "Priority level of the action (Eisenhower matrix)" ;
    rdf:type owl:FunctionalProperty .

### Temporal properties
:doDate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:date ;
    rdfs:label "do date" ;
    rdfs:comment "The date when the action should be done" ;
    rdf:type owl:FunctionalProperty .

:doDateTime rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:dateTime ;
    rdfs:label "do date time" ;
    rdfs:comment "The date and time when the action should be done" ;
    rdf:type owl:FunctionalProperty .

:doTime rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:time ;
    rdfs:label "do time" ;
    rdfs:comment "The time when the action should be done" ;
    rdf:type owl:FunctionalProperty .

:duration rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:duration ;
    rdfs:label "duration" ;
    rdfs:comment "Expected duration of the action in ISO 8601 format" ;
    rdf:type owl:FunctionalProperty .

:durationMinutes rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "duration in minutes" ;
    rdfs:comment "Expected duration of the action in minutes" ;
    rdf:type owl:FunctionalProperty .

:completedDate rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:date ;
    rdfs:label "completed date" ;
    rdfs:comment "The date when the action was completed" ;
    rdf:type owl:FunctionalProperty .

:completedDateTime rdf:type owl:DatatypeProperty ;
    rdfs:domain :Action ;
    rdfs:range xsd:dateTime ;
    rdfs:label "completed date time" ;
    rdfs:comment "The date and time when the action was completed" ;
    rdf:type owl:FunctionalProperty .

### Identification
:actionId rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:identifier ;
    rdfs:domain :Action ;
    rdfs:range xsd:string ;
    rdfs:label "action ID" ;
    rdfs:comment "UUID v7 identifier for the action" ;
    rdf:type owl:FunctionalProperty .

### Project/Story properties
:projectName rdf:type owl:DatatypeProperty ;
    rdfs:subPropertyOf schema:name ;
    rdfs:domain :Project ;
    rdfs:range xsd:string ;
    rdfs:label "project name" ;
    rdfs:comment "The name of the project or story" ;
    rdf:type owl:FunctionalProperty .

### Context properties
:contextName rdf:type owl:DatatypeProperty ;
    rdfs:domain :Context ;
    rdfs:range xsd:string ;
    rdfs:label "context name" ;
    rdfs:comment "The name of the context" ;
    rdf:type owl:FunctionalProperty .

### Recurrence properties
:recurrenceRule rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "recurrence rule" ;
    rdfs:comment "RRULE string following RFC 5545" .

:endDate rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:date ;
    rdfs:label "end date" ;
    rdfs:comment "End date for the recurrence pattern" .

:interval rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "interval" ;
    rdfs:comment "Interval between recurrences (default 1)" .

:count rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:positiveInteger ;
    rdfs:label "count" ;
    rdfs:comment "Maximum number of recurrences" .

### Recurrence constraint properties
:byMinute rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by minute" ;
    rdfs:comment "Comma-separated list of minutes (0-59)" .

:byHour rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by hour" ;
    rdfs:comment "Comma-separated list of hours (0-23)" .

:byDay rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by day" ;
    rdfs:comment "Comma-separated list of weekdays" .

:byMonthDay rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by month day" ;
    rdfs:comment "Comma-separated list of month days (1-31, -31 to -1)" .

:byMonth rdf:type owl:DatatypeProperty ;
    rdfs:domain :RecurrencePattern ;
    rdfs:range xsd:string ;
    rdfs:label "by month" ;
    rdfs:comment "Comma-separated list of months (1-12)" .

#################################################################
#    Constraints and Rules
#################################################################

### Depth constraint (max 5 levels)
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :depth ;
    owl:maxInclusive 5
] .

### Priority constraint (positive integers)
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :priority ;
    owl:minInclusive 1
] .

### State is required
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :hasState ;
    owl:cardinality 1
] .

### Name is required
:Action rdfs:subClassOf [
    rdf:type owl:Restriction ;
    owl:onProperty :actionName ;
    owl:cardinality 1
] .

### Only root actions can belong to projects
[ rdf:type owl:Class ;
  owl:intersectionOf (
    :Action
    [ rdf:type owl:Restriction ;
      owl:onProperty :hasParent ;
      owl:minCardinality 1
    ]
  )
] rdfs:subClassOf [
  rdf:type owl:Restriction ;
  owl:onProperty :belongsToProject ;
  owl:cardinality 0
] .

#################################################################
#    Individuals (State instances)
#################################################################

:notStartedState rdf:type :NotStarted ;
    rdfs:label "Default Not Started State" .

:completedState rdf:type :Completed ;
    rdfs:label "Default Completed State" .

:inProgressState rdf:type :InProgress ;
    rdfs:label "Default In Progress State" .

:blockedState rdf:type :Blocked ;
    rdfs:label "Default Blocked State" .

:cancelledState rdf:type :Cancelled ;
    rdfs:label "Default Cancelled State" .
````

Now let me create examples showing how to translate .actions format to RDF data:

````turtle
// filepath: examples/minimal-example.ttl
@prefix : <http://example.org/actions-ontology#> .
@prefix ex: <http://example.org/actions-data#> .
@prefix rdf: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Original .actions format:
# ( ) Test Action

ex:action001 rdf:type :Action ;
    :actionName "Test Action" ;
    :depth 0 ;
    :hasState :notStartedState .
````

````turtle
// filepath: examples/robust-example.ttl
@prefix : <http://example.org/actions-ontology#> .
@prefix ex: <http://example.org/actions-data#> .
@prefix rdf: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Original .actions format:
# (x) Go to the store for chicken
#     $ Make sure you get the stuff from the butcher directly
#     !1 
#     *Run Errands
# +Driving,Store,Market
# @2025-01-19T08:30D30
# %2025-01-19T10:30
# #214342414342413424

# Project
ex:runErrandsProject rdf:type :Project ;
    :projectName "Run Errands" .

# Contexts
ex:drivingContext rdf:type :Context ;
    :contextName "Driving" .

ex:storeContext rdf:type :Context ;
    :contextName "Store" .

ex:marketContext rdf:type :Context ;
    :contextName "Market" .

# Main action
ex:action002 rdf:type :Action ;
    :actionName "Go to the store for chicken" ;
    :description "Make sure you get the stuff from the butcher directly" ;
    :depth 0 ;
    :hasState :completedState ;
    :priority 1 ;
    :belongsToProject ex:runErrandsProject ;
    :hasContext ex:drivingContext, ex:storeContext, ex:marketContext ;
    :doDateTime "2025-01-19T08:30:00"^^xsd:dateTime ;
    :durationMinutes 30 ;
    :completedDateTime "2025-01-19T10:30:00"^^xsd:dateTime ;
    :actionId "214342414342413424" .
````

````turtle
// filepath: examples/hierarchical-example.ttl
@prefix : <http://example.org/actions-ontology#> .
@prefix ex: <http://example.org/actions-data#> .
@prefix rdf: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Original .actions format:
# ( ) Plan weekend trip
# >( ) Research destinations
# >>( ) Check flight prices
# >>( ) Compare hotel rates
# >( ) Book reservations
# >>( ) Reserve flights
# >>( ) Book hotel

# Parent action
ex:planTrip rdf:type :Action ;
    :actionName "Plan weekend trip" ;
    :depth 0 ;
    :hasState :notStartedState ;
    :hasChild ex:researchDestinations, ex:bookReservations .

# Level 1 children
ex:researchDestinations rdf:type :Action ;
    :actionName "Research destinations" ;
    :depth 1 ;
    :hasState :notStartedState ;
    :hasParent ex:planTrip ;
    :hasChild ex:checkFlights, ex:compareHotels .

ex:bookReservations rdf:type :Action ;
    :actionName "Book reservations" ;
    :depth 1 ;
    :hasState :notStartedState ;
    :hasParent ex:planTrip ;
    :hasChild ex:reserveFlights, ex:bookHotel .

# Level 2 children
ex:checkFlights rdf:type :Action ;
    :actionName "Check flight prices" ;
    :depth 2 ;
    :hasState :notStartedState ;
    :hasParent ex:researchDestinations .

ex:compareHotels rdf:type :Action ;
    :actionName "Compare hotel rates" ;
    :depth 2 ;
    :hasState :notStartedState ;
    :hasParent ex:researchDestinations .

ex:reserveFlights rdf:type :Action ;
    :actionName "Reserve flights" ;
    :depth 2 ;
    :hasState :notStartedState ;
    :hasParent ex:bookReservations .

ex:bookHotel rdf:type :Action ;
    :actionName "Book hotel" ;
    :depth 2 ;
    :hasState :notStartedState ;
    :hasParent ex:bookReservations .
````

````turtle
// filepath: examples/recurring-example.ttl
@prefix : <http://example.org/actions-ontology#> .
@prefix ex: <http://example.org/actions-data#> .
@prefix rdf: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Original .actions format:
# ( ) Take medication @2025-01-20T08:00RD

# Recurrence pattern for daily medication
ex:dailyMedRecurrence rdf:type :RecurrencePattern ;
    :hasFrequency :Daily ;
    :recurrenceRule "FREQ=DAILY;INTERVAL=1" ;
    :interval 1 .

# Action with recurrence
ex:takeMedication rdf:type :Action ;
    :actionName "Take medication" ;
    :depth 0 ;
    :hasState :notStartedState ;
    :doDateTime "2025-01-20T08:00:00"^^xsd:dateTime ;
    :hasRecurrence ex:dailyMedRecurrence .
````

````turtle
// filepath: examples/states-example.ttl
@prefix : <http://example.org/actions-ontology#> .
@prefix ex: <http://example.org/actions-data#> .
@prefix rdf: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Original .actions format showing different states:
# ( ) Not started action
# (x) Completed action
# (-) In progress action
# (=) Blocked action
# (_) Cancelled action

ex:notStartedAction rdf:type :Action ;
    :actionName "Not started action" ;
    :depth 0 ;
    :hasState :notStartedState .

ex:completedAction rdf:type :Action ;
    :actionName "Completed action" ;
    :depth 0 ;
    :hasState :completedState .

ex:inProgressAction rdf:type :Action ;
    :actionName "In progress action" ;
    :depth 0 ;
    :hasState :inProgressState .

ex:blockedAction rdf:type :Action ;
    :actionName "Blocked action" ;
    :depth 0 ;
    :hasState :blockedState .

ex:cancelledAction rdf:type :Action ;
    :actionName "Cancelled action" ;
    :depth 0 ;
    :hasState :cancelledState .
````

````markdown
// filepath: examples/README.md
# Actions Ontology Examples

This folder contains examples showing how to translate .actions file format into RDF using the Actions Ontology.

## Files

### minimal-example.ttl
Shows the simplest possible action translation from:
```actions
( ) Test Action
```

### robust-example.ttl
Shows a fully-featured action with all optional elements from the specification:
```actions
(x) Go to the store for chicken
    $ Make sure you get the stuff from the butcher directly
    !1 
    *Run Errands
+Driving,Store,Market
@2025-01-19T08:30D30
%2025-01-19T10:30
#214342414342413424
```

### hierarchical-example.ttl
Demonstrates parent-child action relationships with multiple levels of nesting:
```actions
( ) Plan weekend trip
>( ) Research destinations
>>( ) Check flight prices
>>( ) Compare hotel rates
>( ) Book reservations
>>( ) Reserve flights
>>( ) Book hotel
```

### recurring-example.ttl
Shows how recurring actions are modeled:
```actions
( ) Take medication @2025-01-20T08:00RD
```

### states-example.ttl
Examples of all five action states:
```actions
( ) Not started action
(x) Completed action  
(-) In progress action
(=) Blocked action
(_) Cancelled action
```

## Usage

These files can be loaded into any RDF triplestore or reasoning engine that supports OWL. The examples demonstrate the mapping between the human-readable .actions format and machine-readable RDF triples.

## Validation

The RDF data can be validated against the ontology in `docs/actions-ontology.owl` using standard OWL reasoning tools or SHACL validators.
````

Now you have a complete ontology in docs/ and comprehensive examples in the examples/ folder showing the translation from .actions format to RDF. 

Would you like me to create any additional examples, such as complex recurrence patterns or SPARQL queries that could be used to extract specific information from the RDF data?

## Me

> Context:
> - <file>action_specification.md</file>


