# laravel-webpack-react-boilerplate

This is my base code for all laravel + webpack + react projects

# Recommended Dev Setup

- Webserver

  ```
  Any of this 2

  - Windows + WSL 2 + Docker
  - Linux + Docker
  ```

- IDE: VS Code + Packages
  ```
  - Laravel Snippets(onecentlin.laravel5-snippets)
  - Laravel Artisan(ryannaddy.laravel-artisan)
  - Laravel Blade Snippets(onecentlin.laravel-blade)
  - laravel intellisense(mohamedbenhida.laravel-intellisense)
  - PHP intelephense(bmewburn.vscode-intelephense-client)
  - PHPDoc Comment(rexshi.phpdoc-comment-vscode-plugin)
  - Prettier(esbenp.prettier-vscode)
  - DotEnv(mikestead.dotenv)
  - Jest(Orta.vscode-jest)
  - Jest Snippets(andys8.jest-snippets)
  ```

# New Project Setup

Follow this instructions after forking the repo and when setting up the project for the first time:

- docker-compose.yaml

  ```
  Change the services and other entry with 'lwr' text to your preffered value,
  I recommend using snake cased project name.
  ```

- .env.example

  ```
  - Search all configurations with #* and #** comments, read the comment and assign necessary values.
  - APP_SERVICE should be equal to the text you replaced 'lwr' in docker-compose.yaml with.
  ```

- docker/init

  ```
  - You may add new commands here for setting up your own project later.
  - Change the SHARED_NETWORK to different name for docker network name to be shared by all your project branches.
  - Go to docker-compose.yaml and ./docker/dev/shared/docker-compose.yaml,
  change networks>sail>name to the value you assigned to SHARED_NETWORK in both files.
  - Go to ./docker/dev/shared/build change lwr_network text the value you assigned in SHARED_NETWORK.
  ```

- ./docker/dev/shared/docker-compose.yaml

  ```
  - You may add new service here that can be shared in all your projects master and branches
  ```

- ./docker/dev/shared/up
  ```
  - Replace lwr_ps_shared texts with your own project shared service name
  ```
- ./docker/dev/shared/build

  ```
  - Replace lwr texts with your own project name
  ```

- lwrworkspace.code-workspace

  ```
  - Rename 'lwrworkspace' to preferred workpace name.
  ```

- Run `alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'`

- Delete file package-lock.json

# Testing this project

- Run `bash ./docker/init`
- Run `sail up --build`
- Run `sail shell` and inside the shell run `php artisan key:generate`
