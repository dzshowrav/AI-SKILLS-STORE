---
name: markdown-viewer-skills
description: Collection of 15 diagram and visualization skills for Markdown — PlantUML, Vega-Lite, Canvas, Infographic, Architecture, Infocard, Graphviz, and more. TRIGGER when user asks to create diagrams, charts, mind maps, architecture diagrams, infographics, or visualizations in Markdown.
---

# Markdown Viewer Agent Skills

Collection of 15 skills for creating diagrams and visualizations in Markdown. Each subdirectory contains its own SKILL.md.

## Quick Reference

| Skill | Code Fence | Type |
|-------|-----------|------|
| `uml/` | ` ```plantuml` / ` ```puml` | 14 UML diagram types |
| `cloud/` | ` ```plantuml` / ` ```puml` | AWS/Azure/GCP/Alibaba/IBM/K8s |
| `network/` | ` ```plantuml` / ` ```puml` | Cisco/Citrix network topology |
| `security/` | ` ```plantuml` / ` ```puml` | IAM/firewall/threat modeling |
| `archimate/` | ` ```plantuml` / ` ```puml` | Enterprise ArchiMate layers |
| `bpmn/` | ` ```plantuml` / ` ```puml` | BPMN/EIP/Lean Mapping |
| `data-analytics/` | ` ```plantuml` / ` ```puml` | ETL/warehouse/ML pipelines |
| `iot/` | ` ```plantuml` / ` ```puml` | Sensor/edge/IoT diagrams |
| `mindmap/` | ` ```plantuml` / ` ```puml` | Hierarchical brainstorm maps |
| `vega/` | ` ```vega-lite` / ` ```vega` | Data-driven charts |
| `infographic/` | ` ```infographic` | 70+ YAML template cards |
| `canvas/` | ` ```canvas` | JSON Canvas mind maps |
| `architecture/` | (raw HTML) | System layer diagrams |
| `infocard/` | (raw HTML) | Editorial info cards |
| `graphviz/` | ` ```dot` | Graphviz DOT graphs |

## Usage

1. Identify the diagram type from user requirements
2. Read the specific `SKILL.md` in the subdirectory for syntax rules
3. Use the specified code fence
4. Write content following the skill's templates
