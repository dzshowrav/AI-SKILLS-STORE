//! Tree-sitter parser for the `.actions` file format.
//!
//! # Parsing
//!
//! Use the [LANGUAGE] constant to parse `.actions` files:
//!
//! ```
//! let code = "[ ] Buy milk\n!1\n";
//! let mut parser = tree_sitter::Parser::new();
//! parser
//!     .set_language(&tree_sitter_actions::LANGUAGE.into())
//!     .expect("Error loading Actions parser");
//! let tree = parser.parse(code, None).unwrap();
//! assert!(!tree.root_node().has_error());
//! ```
//!
use tree_sitter_language::LanguageFn;

extern "C" {
    fn tree_sitter_actions() -> *const ();
}

/// The tree-sitter [`LanguageFn`][LanguageFn] for this grammar.
///
/// [LanguageFn]: https://docs.rs/tree-sitter-language/*/tree_sitter_language/struct.LanguageFn.html
pub const LANGUAGE: LanguageFn = unsafe { LanguageFn::from_raw(tree_sitter_actions) };

/// The content of the [`node-types.json`][] file for this grammar.
///
/// [`node-types.json`]: https://tree-sitter.github.io/tree-sitter/using-parsers/6-static-node-types
pub const NODE_TYPES: &str = include_str!("../../src/node-types.json");

/// The syntax highlighting query for this grammar.
pub const HIGHLIGHTS_QUERY: &str = include_str!("../../queries/actions/highlights.scm");

/// The indentation query for this grammar.
pub const INDENTS_QUERY: &str = include_str!("../../queries/actions/indents.scm");

/// The formatting query for this grammar.
pub const FORMATTING_QUERY: &str = include_str!("../../queries/actions/formatting.scm");
