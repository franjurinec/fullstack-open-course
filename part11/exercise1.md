# Exercise 11.1  

## Common CI tools in the Java ecosystem  

### __Linting__  

__Checkstyle__ - open-source Java linter with rules defined defined via XML files.

__SonarLint__ - a free code analysis tool by Sonar that checks quality and security of code in addition to style.

### __Testing__

__JUnit (unit testing)__ - popular open-source unit testing framework for Java.

__REST Assured (integration testing)__ - open-source integration testing tool for testing REST APIs.

__Selenium (UI testing)__  - open-source browser automation tool used for UI E2E testing.

### __Building__ 
__Gradle__ - open-source build and build automation tool used in the Java ecosystem. Build scripts are defined in Groovy and it can be used with a variety of programming languages, including Java.

__Maven__ - another open-source build automation tool. Build scripts are written in XML.

## CI/CD alternatives to Jenkins and GitHub Actions
- __CircleCI__ and __TravisCI__ - independent cloud-based CI/CD pipeline tools
- __Azure DevOps (ADO)__ and __AWS CodeBuild__ - native CI/CD tooling from big cloud providers (Microsoft, Amazon)
- __Bitbucket Pipelines__ and __GitLab CI/CD__ - CI/CD tooling from other Git providers

## Cloud-based vs. Self-hosted
In our scenario cloud-based solutions, especially those integrated with Git providers (GitHub Actions, GitLab CI/CD, etc.) offer the best starting point for CI/CD as they are very simple to set up and require very little pre-requisite technical skills. In addition, they lower the complexity of maintenance and scaling of future pipelines.

There are many factors that can affect this choice (mainly total cost and technical complexity of setting up/maintaining the system), however for smaller companies and individuals, the cloud-based offering will almost always be simpler and cheaper. For large scale enterprises with dedicated infrastructure teams, deploying their own CI/CD system such as Jenkins could be more cost-effective.