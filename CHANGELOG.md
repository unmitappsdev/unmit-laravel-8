# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes
* Added for new features
* Changed for changes in existing functionality
* Deprecated for soon-to-be removed features
* Removed for now removed features
* Fixed for any bug fixes
* Security in case of vulnerabilities

## [Released]

## [1.2.15] - 2023-10-19 MH
### Changed
- update pipelines.yml to reflect the latest instruction for creating pipelines

## [1.2.14] - 2023-08-15 MH
### Added
- add pipelines.yml to make it easy to set up a Pipeline for the project

## [1.2.13] - 2022-03-25 MH
### Added
- no_search key in ./resources/models/
- key_only key in ./resources/data/

## [1.2.12] - 2022-02-08 MH
### Changed
- required NodeJS to v14 instead of v15 to match the one on oraweb02p (currently available production server) on unmit-laravel-setup.sh version checking code
- from customized hanovate/cas package to subfission/cas

## [1.2.11] - 2021-10-19 MH
### Added
- sortfuncs parameter to allow DB native functions for sorting (e.g. TO_NUMBER) in Api/BaseController class

## [1.2.11] - 2021-10-19 MH
### Added
- sortfuncs parameter to allow DB native functions for sorting (e.g. TO_NUMBER) in Api/BaseController class

## [1.2.10] - 2021-07-13 MH
### Changed
- Update package.json & webpack.mix.js to accommodate updated versions of NodeJS & npm (v15.14)

## [1.2.9] - 2021-04-30 MH
### Fixed
- FormAdd initial value of vals for defaults

## [1.2.8] - 2021-04-29 MH
### Added
- FormAutosuggest & FormAutosuggest2 components now accepts "url_param_fields" values

## [1.2.7] - 2021-04-28 MH
### Added
- FormAdd components now accepts "default" and "defaultKey" values

## [1.2.6] - 2021-04-23 MH
### Changed
- allow for blank relational keys

## [1.2.5] - 2021-04-22 MH
### Fixed
- location for Controller.php & TextController.php

## [1.2.4] - 2021-04-21 MH
### Added
- server location badge


## [1.2.3] - 2021-04-16 George Rainone
### Fixed
- key/value pair reference in FormDropdown component


## [1.2.2] - 2021-04-15 George Rainone
### Added
- additional date formats in definition files


## [1.2.1] - 2021-04-15 MH
### Added
- allow for %lang:xxx% usage under ./resources/models/*.yaml definition files
- allow for %lang:xxx% usage for table definition files as well

## [1.2.0] - 2021-04-09 MH
### Added
- resources/js/components/FormLoadfrom.js
- resources/css/typography-fonts.css
- addition of onclear > reset fields to YAML defs

### Changed
- app/Http/Controller/Controller.php: add %env:xxxx% to retrieve from ~/.env file
- app/helpers.php: add get_basedomain() helper function -- this can be used to define your 'fqdn' in controllers
- resources/view/layouts/base.blade.php: locally source the missing typography fonts
- Form components 
  resources/js/components/FormAdd.js
  resources/js/components/FormEdit.js
  resources/js/components/FormAutosuggest.js
  resources/js/components/FormAutosuggest2.js


## [1.1.6] - 2021-03-05 MH
### Added
- check runkit version in OracleModel

## [1.1.5] - 2021-02-17 MH
### Added
- text edit module

## [1.1.5] - 2021-02-25 George Rainone
### Updated
- BaseController allows multiple keyword searches

## [1.1.4] - 2021-01-29 MH
### Added
- student-district.tar.gz

## [1.1.3] - 2021-01-28 MH
### Added
- reoranize files
- add --force to artisan vendor:publish command

## [1.1.2] - 2021-01-27 MH
### Added
- remove setup-composer.php after use

## [1.1.1] - 2021-01-26 MH
### Added
- check for Python3

## [1.1.0] - 2021-01-22 MH
### Added
- oracle.php
- many files in previous commits

## [1.0.1] - 2021-01-19 MH
### Added
- permission setting of folders
- comment out npm execution lines

## [1.0.0] - 2021-01-11 MH
### Added
- add the rest of files

## [0.0.4] - 2020-12-10 MH
### Added
- package.json
- site.js
- Kernel.php
- cas.env
- resources/*

## [0.0.3] - 2020-12-09 MH
### Added
- components.tar.gz

## [0.0.2] - 2020-12-08 MH
### Added
- webpack.mix.js
- helpers.php
- setup-composer.php

## [0.0.1] - 2020-10-28 MH
### Added
- initial commit of OracleModel.php v0.1.1
