# mhplus-prototype

A graphical website-relaunch.

# naming-conventions

- basically: https://docs.typo3.org/typo3cms/ExtbaseFluidBook/a-CodingGuidelines/Index.html

# path-layout

- [Build](./Build)
  Place everthing that is needed to build the prototype here.
  For example:
  - SASS/Less related frameworks and scripts (excluding the actual *.sass, *,scss or *.less files)
  - Javascript build stuff, like grunt.js or the like …
- Resources
  - Public
    - Prototype
    - Scripts
    - Styles
      stylesheets (css)
      use subfolders if needed
      - Images
        - images which are referenced via stylesheet
        - sprites
    - Images
      - images which are part of the layout and/or not (only) referenced via stylesheet
    - Icons
      - iconic files which are not part of any sprite
  - Private
    - SourceStyles
      stylesheet sources *.sass, *,scss or *.less, if needed
    - SourceScripts
      uncompiled javascripts sources, if needed
    - Prototype
      the prototype will be moved here as soon as this is released (published)
    - Templates
      Fluid-templates, as soon as those are relevant
    - Layouts
      Fluid-layouts, as soon as those are relevant
    - Partials
      Fluid-partials, as soon as those are relevant

