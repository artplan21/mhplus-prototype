# mhplus-prototype

A graphical website-relaunch.

# naming-conventions

- basically: https://docs.typo3.org/typo3cms/ExtbaseFluidBook/a-CodingGuidelines/Index.html

# path-layout

- [Build](./Build)
  • Place everthing that is needed to build the prototype here.
  • For example:
  - SASS/Less related frameworks and scripts (excluding the actual *.sass, *,scss or *.less files)
  - Javascript build stuff, like grunt.js or the like …
- [Resources](./Resources)
  - [Public](./Resources/Public)
    - [Prototype](./Resources/Public/Prototype)
      place prototype-markup files (*.html) here
    - [Scripts](./Resources/Public/Scripts)
      • place (public, minified) javascript here
      • try to put their (raw not minified) sources under [Resources/Private/Sources](./Resources/Private/Sources)
    - [Styles](./Resources/Public/Styles)
      • place (public, minified) stylesheets (css) here
      • try to put their (raw not minified) sources under [Resources/Private/Sources](./Resources/Private/Sources)
      • use subfolders if needed
      - [Images](./Resources/Public/Styles/Images)
        • images which are referenced via stylesheet
        • sprites
    - [Images](./Resources/Public/Images)
      • images which are part of the layout and/or not (only) referenced via stylesheet
    - [Icons](./Resources/Public/Icons)
      • iconic files which are not part of any sprite
  - [Private](./Resources/Private)
    - [Sources](./Resources/Private/Sources)
      • stylesheet sources *.sass, *,scss or *.less, if needed
      • uncompiled javascripts sources, if needed
      • sprite-source files, if needed
    - [Prototype](./Resources/Private/Prototype)
      • the prototype will be moved here as soon as this is released (published)
    - [Templates](./Resources/Private/Templates)
      • Fluid-templates, as soon as those are relevant
      • other markup-templates, as soon as those are relevant
    - [Layouts](./Resources/Private/Layouts)
      • Fluid-layouts, as soon as those are relevant
    - [Partials](./Resources/Private/Partials)
      • Fluid-partials, as soon as those are relevant

# entwicklungs-umgebung von Olaf
- ruby 2.1.6-p336
- bigdecimal (1.2.4)
- cssminify (1.0.2)
- io-console (0.4.3)
- json (1.8.1)
- minitest (4.7.5)
- psych (2.0.5)
- rake (10.1.0)
- rdoc (4.1.0)
- sass (3.4.18)
- test-unit (2.1.6.0)


