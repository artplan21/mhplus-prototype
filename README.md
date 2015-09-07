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
- [Resources](./Resources)
  - [Public](./Resources/Public)
    - [Prototype](./Resources/Public/Pototype)
    - [Scripts](./Resources/Public/Scripts)
    - [Styles](./Resources/Public/Styles)
      stylesheets (css)
      use subfolders if needed
      - [Images](./Resources/Public/Styles/Images)
        - images which are referenced via stylesheet
        - sprites
    - [Images](./Resources/Public/Images)
      - images which are part of the layout and/or not (only) referenced via stylesheet
    - [Icons](./Resources/Public/Icons)
      - iconic files which are not part of any sprite
  - [Private](./Resources/Private)
    - [Sources](./Resources/Private/Sources)
      stylesheet sources *.sass, *,scss or *.less, if needed
      uncompiled javascripts sources, if needed
    - [Prototype](./Resources/Private/Prototype)
      the prototype will be moved here as soon as this is released (published)
    - [Templates](./Resources/Private/Templates)
      Fluid-templates, as soon as those are relevant
    - [Layouts](./Resources/Private/Layouts)
      Fluid-layouts, as soon as those are relevant
    - [Partials](./Resources/Private/Partials)
      Fluid-partials, as soon as those are relevant

