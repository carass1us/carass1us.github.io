# carass1us.github.io

## Editing Content

This site uses [Jekyll](https://jekyllrb.com/) to generate pages from structured data files. You don't need to edit the HTML directly to add or update experiences, projects, or TA weeks — just edit the relevant files below.

---

### Professional Experiences

**Location:** `_experiences/`  
**Naming convention:** `slug.md` (e.g. `my-new-job.md`)

Each file contains only YAML front matter (no body content needed):

```yaml
---
title: "Organisation Name"
subtitle: "Role, Department"
date_start: YYYY-MM-DD        # used for sorting (most recent first)
date_display: "Mon YYYY – Mon YYYY"  # shown on the page
current: false                # set true if the role is ongoing
bullets:
  - "First bullet point."
  - "Second bullet point, may include raw HTML for links."
---
```

**Example** (`_experiences/example-org.md`):

```yaml
---
title: "Example Organisation"
subtitle: "Research Assistant, Department of Economics"
date_start: 2026-01-01
date_display: "Jan 2026 – Present"
current: true
bullets:
  - "Conducted literature reviews and summarised findings for senior researchers."
  - "Maintained project documentation and prepared progress reports."
---
```

To **add** an experience: create a new `.md` file in `_experiences/`.  
To **remove** one: delete its `.md` file.  
To **edit** one: open the file and change the front matter values.

---

### Projects / Portfolio

**Location:** `_projects/`  
**Naming convention:** `slug.md` (e.g. `my-new-paper.md`)

```yaml
---
title: "Full project title"
emoji: "🏆"          # optional — prepended to the title on the card
featured: true        # true = shown first; false (or omit) = shown after featured items
date: YYYY-MM-DD      # used for sorting within each group (most recent first)
description: "Short description shown on the card. May contain raw HTML for links."
pdf_url: "https://drive.google.com/file/d/FILE_ID/preview"  # optional
---
```

**Example** (`_projects/example-paper.md`):

```yaml
---
title: "Impact of Fiscal Policy on Household Welfare in Java"
emoji: "📊"
featured: false
date: 2026-02-01
description: "Empirical analysis using BPS household survey data and a difference-in-differences strategy."
pdf_url: "https://drive.google.com/file/d/EXAMPLE_ID/preview"
---
```

To **add** a project: create a new `.md` file in `_projects/`.  
To **remove** one: delete its `.md` file.  
To **edit** one: open the file and change the front matter values.

---

### TA Week Materials (CSPD / cspd.html)

**Location:** `_data/ta_weeks.yml`  
All weeks are stored in a single YAML list. Each entry uses the following fields:

```yaml
- week: 0               # integer; determines sort order (ascending)
  date: "Mon DD, YYYY"  # display date shown on the timeline
  title: "Session Title"
  description: "Short description of the week's topic."
  actions:              # optional list of buttons/links
    - type: slides      # "slides" = modal button; "download" = anchor with download attribute
      label: "Button Label"
      icon: "fas fa-desktop"   # any FontAwesome 6 class
      url: "https://drive.google.com/file/d/FILE_ID/preview"
    - type: download
      label: "Handout"
      icon: "fas fa-download"
      url: "https://drive.google.com/file/d/FILE_ID/preview"
```

**Example entry:**

```yaml
- week: 7
  date: "Apr 08, 2026"
  title: "Panel Data: Fixed Effects"
  description: "Introduction to within-group estimators for panel data."
  actions:
    - type: slides
      label: "Slides"
      icon: "fas fa-desktop"
      url: "https://drive.google.com/file/d/EXAMPLE_ID/preview"
    - type: download
      label: ".do File"
      icon: "fas fa-download"
      url: "https://drive.google.com/file/d/EXAMPLE_DO_ID/preview"
```

To **add** a week: append a new entry to `_data/ta_weeks.yml`.  
To **remove** a week: delete its entry from the list.  
To **edit** a week: change the relevant fields in its entry.
