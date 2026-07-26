-- Check if conceal metadata is being applied to captures
-- Usage: nvim --headless <file.actions> +"source scripts/nvim/check_conceal_metadata.lua" +q

local buf = vim.api.nvim_get_current_buf()
local parser = vim.treesitter.get_parser(buf, 'actions')
local tree = parser:parse()[1]
local root = tree:root()
local query = vim.treesitter.query.get('actions', 'highlights')

print('Checking conceal metadata on first 3 lines...')
for id, node, metadata in query:iter_captures(root, buf, 0, 3) do
  local capture_name = query.captures[id]
  if capture_name == 'conceal' then
    local start_row, start_col = node:start()
    local text = vim.treesitter.get_node_text(node, buf):gsub('\n', '\\n')
    print(string.format('Line %d: @conceal on "%s" (node: %s)', start_row, text, node:type()))

    if metadata and metadata.conceal then
      print('  -> HAS conceal metadata: "' .. metadata.conceal .. '"')
    else
      print('  -> NO conceal metadata found!')
    end
  end
end
