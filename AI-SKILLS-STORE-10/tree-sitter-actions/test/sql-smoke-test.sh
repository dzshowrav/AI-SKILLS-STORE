#!/bin/bash
# SQL Schema Smoke Test
# Quick validation that the SQL schema works end-to-end

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== SQL Schema Smoke Test ===${NC}"
echo ""

# Create temporary database
TEMP_DB=$(mktemp /tmp/actions-test-XXXXXX.db)
trap "rm -f $TEMP_DB" EXIT

echo -e "${BLUE}1. Creating schema...${NC}"
sqlite3 "$TEMP_DB" < "$PROJECT_ROOT/schema/actions.sql"
echo -e "${GREEN}✓ Schema created${NC}"

# Verify tables exist
echo -e "\n${BLUE}2. Verifying tables...${NC}"
TABLE_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM sqlite_master WHERE type='table';")
VIEW_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM sqlite_master WHERE type='view';")

if [ "$TABLE_COUNT" = "3" ] && [ "$VIEW_COUNT" = "3" ]; then
    echo -e "${GREEN}✓ All tables (3) and views (3) created${NC}"
else
    echo -e "${RED}✗ Expected 3 tables and 3 views, got $TABLE_COUNT tables and $VIEW_COUNT views${NC}"
    exit 1
fi

# Insert test data
echo -e "\n${BLUE}3. Inserting test data...${NC}"
sqlite3 "$TEMP_DB" <<EOF
-- Insert root action
INSERT INTO actions (id, depth, state, name, priority, story, do_datetime, do_duration)
VALUES ('test-id-1', 0, 'not_started', 'Test action 1', 1, 'Test Project', '2025-01-16T09:00', 60);

-- Insert another root action
INSERT INTO actions (id, depth, state, name, priority)
VALUES ('test-id-2', 0, 'completed', 'Test action 2', 2);

-- Insert child action
INSERT INTO actions (id, parent_id, depth, state, name)
VALUES ('test-id-3', 'test-id-1', 1, 'not_started', 'Child action');

-- Insert contexts
INSERT INTO action_contexts (action_id, context) VALUES ('test-id-1', 'work');
INSERT INTO action_contexts (action_id, context) VALUES ('test-id-1', 'urgent');
INSERT INTO action_contexts (action_id, context) VALUES ('test-id-2', 'personal');

-- Insert recurrence
INSERT INTO action_recurrence (action_id, frequency, interval)
VALUES ('test-id-1', 'daily', 1);
EOF
echo -e "${GREEN}✓ Test data inserted${NC}"

# Run test queries
echo -e "\n${BLUE}4. Running test queries...${NC}"

# Test 1: Count actions
ACTION_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM actions;")
if [ "$ACTION_COUNT" = "3" ]; then
    echo -e "${GREEN}✓ Action count correct (3)${NC}"
else
    echo -e "${RED}✗ Expected 3 actions, got $ACTION_COUNT${NC}"
    exit 1
fi

# Test 2: Find P1 actions
P1_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM actions WHERE priority = 1;")
if [ "$P1_COUNT" = "1" ]; then
    echo -e "${GREEN}✓ P1 filter working${NC}"
else
    echo -e "${RED}✗ P1 filter failed${NC}"
    exit 1
fi

# Test 3: Context join
WORK_CONTEXT_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(DISTINCT a.id) FROM actions a JOIN action_contexts c ON a.id = c.action_id WHERE c.context = 'work';")
if [ "$WORK_CONTEXT_COUNT" = "1" ]; then
    echo -e "${GREEN}✓ Context join working${NC}"
else
    echo -e "${RED}✗ Context join failed${NC}"
    exit 1
fi

# Test 4: Parent-child relationship
CHILD_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM actions WHERE parent_id = 'test-id-1';")
if [ "$CHILD_COUNT" = "1" ]; then
    echo -e "${GREEN}✓ Parent-child relationship working${NC}"
else
    echo -e "${RED}✗ Parent-child relationship failed${NC}"
    exit 1
fi

# Test 5: View access
ROOT_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM root_actions;")
if [ "$ROOT_COUNT" = "2" ]; then
    echo -e "${GREEN}✓ Views working${NC}"
else
    echo -e "${RED}✗ View failed${NC}"
    exit 1
fi

# Test 6: Recurrence table
RECURRING_COUNT=$(sqlite3 "$TEMP_DB" "SELECT COUNT(*) FROM actions a JOIN action_recurrence r ON a.id = r.action_id;")
if [ "$RECURRING_COUNT" = "1" ]; then
    echo -e "${GREEN}✓ Recurrence join working${NC}"
else
    echo -e "${RED}✗ Recurrence join failed${NC}"
    exit 1
fi

# Test 7: Constraints (should fail)
echo -e "\n${BLUE}5. Testing constraints...${NC}"
set +e  # Don't exit on error for constraint tests

# Test invalid state
sqlite3 "$TEMP_DB" "INSERT INTO actions (id, depth, state, name) VALUES ('bad-1', 0, 'invalid_state', 'Test');" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${GREEN}✓ State constraint working${NC}"
else
    echo -e "${RED}✗ State constraint failed to reject invalid value${NC}"
    exit 1
fi

# Test invalid depth
sqlite3 "$TEMP_DB" "INSERT INTO actions (id, depth, state, name) VALUES ('bad-2', 10, 'not_started', 'Test');" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${GREEN}✓ Depth constraint working${NC}"
else
    echo -e "${RED}✗ Depth constraint failed to reject invalid value${NC}"
    exit 1
fi

# Test foreign key (orphaned child)
sqlite3 "$TEMP_DB" "PRAGMA foreign_keys = ON; INSERT INTO actions (id, parent_id, depth, state, name) VALUES ('bad-3', 'nonexistent', 1, 'not_started', 'Test');" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${GREEN}✓ Foreign key constraint working${NC}"
else
    echo -e "${RED}✗ Foreign key constraint failed${NC}"
    exit 1
fi

set -e  # Re-enable exit on error

# Summary
echo -e "\n${BLUE}=== Summary ===${NC}"
echo -e "${GREEN}✓ Schema creates successfully${NC}"
echo -e "${GREEN}✓ All tables and views present${NC}"
echo -e "${GREEN}✓ Data insertion works${NC}"
echo -e "${GREEN}✓ Basic queries work${NC}"
echo -e "${GREEN}✓ Joins work (contexts, recurrence)${NC}"
echo -e "${GREEN}✓ Hierarchical queries work${NC}"
echo -e "${GREEN}✓ Constraints enforce data integrity${NC}"
echo ""
echo -e "${GREEN}All tests passed!${NC}"
