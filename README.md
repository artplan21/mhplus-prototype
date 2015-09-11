# mhplus Prototype

A graphical website-relaunch.

## Naming-Conventions

- basically: https://docs.typo3.org/typo3cms/ExtbaseFluidBook/a-CodingGuidelines/Index.html

## Path-Layout

- [Build](./Build)
  • Place everthing that is needed to build the prototype here.
  • For example:
  - SASS/Less related frameworks and scripts (excluding the actual *.sass, *,scss or *.less files)
  - Javascript build stuff, like grunt.js or the like …
- [Resources](./Resources)
  • All resource files belong here - private and public
  - [Public](./Resources/Public)
    • All public resource files belong here
    - [Prototype](./Resources/Public/Prototype)
      • place prototype-markup files (*.html) here
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
    • All private resource files belong here
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

## Development-Environment

### Ruby based tools

see [Build/Gemfile.lock](./Build/Gemfile.lock)

11.09.2015:

- ruby 2.1.6-p336
- bigdecimal (1.2.4)
- bundler (1.10.6)
- chunky_png (1.3.4)
- compass (1.0.3)
- compass-core (1.0.3)
- compass-import-once (1.0.5)
- cssminify (1.0.2)
- ffi (1.9.10)
- foundation (1.0.4)
- io-console (0.4.3)
- json (1.8.1)
- minitest (4.7.5)
- multi_json (1.11.2)
- psych (2.0.5)
- rake (10.1.0)
- rb-fsevent (0.9.6)
- rb-inotify (0.9.5)
- rdoc (4.1.0)
- rubygems-update (2.4.8)
- sass (3.4.18)
- test-unit (2.1.6.0)
- thor (0.19.1)

### Node.js based tools

see [Build/package.json](./Build/package.json)

11.09.2015:

- node.js 4.0.0
  - contains npm
- bower 1.5.2

## Framework and toolchain

[Foundation](http://foundation.zurb.com)
