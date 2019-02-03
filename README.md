# README

This is a boilerplate Rails project that uses:

* `ruby ~> 2.5`
* `postgresql` as the database
* `webpacker` with `react`
* the `react_on_rails` gem

## Deployment

* `heroku create your-app-name`
* `heroku buildpacks:set heroku/ruby`
* `heroku buildpacks:add --index 1 heroku/nodejs`
* `git push heroku master`
* `heroku run rails db:migrate`
