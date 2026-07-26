-- Debug script to show all captures on first few lines
-- Usage: nvim --headless <file.actions> +"source scripts/nvim/debug_all_captures.lua" +q

local buf = vim.api.nvim_get_current_buf()
local parser = vim.treesitter.get_parser(buf, 'actions')
local tree = parser:parse()[1]
local root = tree:root()
local query = vim.treesitter.query.get('actions', 'highlights')

print('=== ALL CAPTURES ON LINE 0 ===')
for id, node, metadata in query:iter_captures(root, buf, 0, 1) do
  local capture_name = query.captures[id]
  local text = vim.treesitter.get_node_text(node, buf):gsub('\n', '\\n')
  local meta_info = ""
  if metadata and metadata.conceal then
    meta_info = ' -> conceal="' .. metadata.conceal .. '"'
  end
  print(string.format('@%s on (%s) = %q%s', capture_name, node:type(), text, meta_info))
end
