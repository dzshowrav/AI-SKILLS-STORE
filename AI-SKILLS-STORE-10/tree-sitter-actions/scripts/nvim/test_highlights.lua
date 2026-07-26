-- Test script to check if highlights query loads and captures correctly
-- Usage: nvim --headless <file.actions> +"source scripts/nvim/test_highlights.lua" +q

local parser = vim.treesitter.get_parser(0, 'actions')
local tree = parser:parse()[1]
local root = tree:root()

local query = vim.treesitter.query.get('actions', 'highlights')
if not query then
  print('ERROR: No highlights query loaded!')
  return
end

print('Highlights query loaded with ' .. #query.captures .. ' capture names')
print('Testing captures on buffer...')

local count = 0
for id, node, metadata in query:iter_captures(root, 0) do
  count = count + 1
  local capture_name = query.captures[id]
  local node_type = node:type()
  local node_text = vim.treesitter.get_node_text(node, 0)

  print(string.format('Capture #%d: @%s on (%s) = %q', count, capture_name, node_type, node_text))

  if metadata and metadata.conceal then
    print('  -> Conceal replacement: ' .. metadata.conceal)
  end
end

if count == 0 then
  print('ERROR: Query loaded but NO CAPTURES MATCHED!')
  print('This means the query patterns do not match any nodes in your parse tree.')
end
