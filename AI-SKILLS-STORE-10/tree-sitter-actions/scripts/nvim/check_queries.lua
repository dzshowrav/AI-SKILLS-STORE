-- Check if queries are found in Neovim's runtime path
-- Usage: nvim --headless <file.actions> +"source scripts/nvim/check_queries.lua" +q

local files = vim.api.nvim_get_runtime_file('queries/actions/highlights.scm', true)
print('Found highlights.scm files: ' .. #files)
for _, f in ipairs(files) do
  print('  ' .. f)
end

if #files > 0 then
  local query = vim.treesitter.query.get('actions', 'highlights')
  if query then
    print('Query loaded successfully!')
    print('Captures: ' .. #query.captures)
  else
    print('ERROR: Query file found but failed to load!')
  end
else
  print('ERROR: No highlights.scm found in runtime path!')
end
