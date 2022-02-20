# Git
Follow the steps to add a new feature/fix/refactor to the repository

![](https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png)
> let´s code

1. Get into main branch <br>
    `$ git checkout main` and  `$ git pull`

2. Create a branch with the following rules
    BranchName: first_name + / + issue_number + / + explanation_text
    Branch example: andres/51/add_footer <br>
    `$ git checkout -b andres/51/add_footer`

3. Work in feature

4. Add changes <br>
   `$ git add .`

5. Create commit  <br>
    `$ git commit -m "short changes description"`

6. Push changes <br>
    `$ git push --set-upstream origin your_branch_name`

Before to complete the feature create a pull request.

1. Click on 'Pull requests' on github page
2. Click on 'New pull resquest'
3. Select branch and target

    base: main   --------   compare: your_branch_name

4. Add as reviewer to Andres_2D, don't merge the pull request.
