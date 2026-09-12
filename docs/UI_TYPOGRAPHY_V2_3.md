# UI & Typography v2.3 — Easy-read pass

## Goal

Reduce perceptual and cognitive effort without making the product look clinical or infantile.

## Changes

- Base text increased to 18 px (17 px on small screens before user scaling).
- System sans-serif stack prioritizes Segoe UI / system UI / Arial for predictable Vietnamese glyphs.
- Removed negative tracking from headings.
- Removed continuous uppercase transformations from instructional labels.
- Increased small/secondary text to approximately 0.9rem.
- Body line-height increased to 1.65; instructional copy uses up to 1.7.
- Main copy is constrained to a readable line measure.
- Underlined action text was replaced with clearer link-button styling.
- Calm mode uses lighter shadows and less ambient decoration.
- Child-facing home copy is shorter and more concrete.
- Mobile cards use larger text and more whitespace.

## Why

W3C cognitive-accessibility guidance emphasizes readable, predictable content and clear controls.
CAST UDL 3.0 recommends allowing customization of font size, spacing, contrast, layout and other
perceptual features. The British Dyslexia Association style guide recommends familiar sans-serif
fonts, sufficiently large text, generous line spacing, avoiding continuous capitals/italics/underlining,
and allowing users to request larger text.

This product therefore uses an easy-read default rather than a diagnosis-specific font.

## Repository ergonomics

A `.gitattributes` file now pins text files to LF in Git while leaving binary assets untouched. This prevents the repeated Windows `LF will be replaced by CRLF` warnings seen in the previous push workflow without affecting how editors display files locally.
