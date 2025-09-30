<!-- # Senior Thesis Repo: [PLACE YOUR PROJECT NAME HERE]
This repository is provided to help you build your senior thesis project. You will edit it to store your specification documents, code, and weekly checkins.

First, fork this repo (this makes a copy of it associated with your account) and then clone it to your machine (this makes a copy of your fork on your personal machine). You can then use an editor and a GitHub client to manage the repository.

### Markdown
This file is called README.md. It is a [Markdown file](https://en.wikipedia.org/wiki/Markdown). Markdown is a simple way to format documents. When a Markdown-ready viewer displays the contents of a file, it formats it to look like HTML. However, Markdown is significantly easier to write than HTML. VSCode supports displaying Markdown in a preview window. GitHub uses Markdown extensively including in every repo's description file, ```README.md```.

All Markdown files end with the extension ```.md```. There is a Markdown tutorial [here](https://www.markdowntutorial.com/) and a Markdown cheatsheet [here](https://www.markdownguide.org/cheat-sheet/).

#### Images
If you would like to add images to a Markdown file, place them in the ```docs/images/``` directory in this repo and reference them using markdown like this:

```
![alt text](relative/path/to/image)
```

Here is how to add the Carthage logo to a Markdown file (you can see the image in the repo right now):

```
![Carthage Firebird Logo](docs/images/firebirdLogo.jpg)
```
![Carthage Firebird Logo](docs/images/firebirdLogo.jpg)

This ensures that images are correctly linked and displayed when viewing the documentation on GitHub or any Markdown-supported platform.

## Code
The ```code``` directory is used to store your code. You can put it all in one directory or you can create subdirectories.

I have added a ```main.cpp``` file to get you started. Feel free to remove it.

If you have any questions feel free to ask me! I'll answer professor questions, customer questions, and give advice if asked.

# Sample Spec

Below is an example of a project specification.   -->

## Software Requirements Specification for the Bingo Simulator and Calculator

## Introduction

### Purpose
<!-- 
The purpose of this document is to outline the functional and non-functional requirements of Mahoney University’s new online registration system. The system is designed to streamline the registration process for students and faculty, replacing the outdated manual system. This specification serves as a contract between the system stakeholders and the developers to ensure that the system meets the needs of its users while adhering to university policies and technical constraints. -->
The purpose of this document is to outline the functional and non-functional requirements of the Bingo Simulator and Calculator. The system is designed to simulate a game of bingo entirely online in a web based application and caclulate the players' odds of winning. 

The key goals of the new system are:
- To have a functional bingo game that has a host organizing the game of bingo and players able to join and play. 
- A storage of data during the game that allows for the calculation of any given player's winning odds and displaying it to the player (or everyone)
- Register and Login admin users that can host and organize games for players to join and play in
- Have additional game modes that change the conditions for winning the game as well as the odds of winning

<!-- The key goals of the new system are:
- To improve the efficiency of the course registration process for students.
- To provide staff in the Registrar’s Office with tools to manage course offerings, schedules, and student records.
- To enhance the accuracy and accessibility of student academic information, such as grades and enrollment history.
- To support the university’s transition to digital infrastructure while maintaining compatibility with legacy systems during a transitional period. -->

### Scope

This system is intended to make a game available for a game to be played by anyone with a web browser. The system will handle:
- Keeping track of players who will be able to join games without having to create any type of account.
- Calling balls and thus storing which balls have been called to keep track of who wins. 
- The calculation of who has the best odds of winning based on how many people are playing the game and/or other people's bingo board. 
<!-- - Enrollment validation, including prerequisite checks and course availability.
- Management of student schedules, including the ability to add, drop, or modify course enrollments.
- Grade viewing and transcript requests. -->

The scope of the system also includes an interface to:
- Create new games if a user has admin priveleges
- Manually call out balls
- Play the game of bingo, allowing players to mark off cards based on the balls that have been called
- Show the current percent chance of winning
<!-- This system is intended to support the registration process for all students at Mahoney University, including undergraduates, graduate students, and non-degree-seeking students. The system will handle:
- Student authentication and secure access to personal records.
- Course search and registration.
- Enrollment validation, including prerequisite checks and course availability.
- Management of student schedules, including the ability to add, drop, or modify course enrollments.
- Grade viewing and transcript requests.

The scope of the system also includes administrative tools for the Registrar’s Office to:
- Create and modify course offerings for each academic term.
- Manage enrollment caps, waitlists, and course prerequisites.
- Track student progress and generate reports for academic performance. -->

### Definitions, Acronyms, and Abbreviations
- **Bingo Card**: A 5 x 5 card that contains 25 numbers (or 24 if there's a free space) ranging 1-75, the 5 columns are labled B-I-N-G-0, and certain ranges of number pertain to a specific column. B: 1-15, I: 16-30, N: 31-45, G: 46-60 O: 61-75.
- **Winning Odds**: A percentage value that should be the amount of times you win in a given scenario based on the progress of one's bingo card, how many balls have been called, the amount of players playing, other player's progress, etc.
- **Alternate Game Modes**: Other variations of bingo that aren't 5 in a row, such as blackout or four corners
- **Admin User**: A user that has an account registered with a database that allows them to create new games, choose game mode, and manually control the game of bingo once the game has been started.
- **Lobby**: A 'waiting room' of sorts where that allows players join the game before officially starting
<!-- - **Waitlist**: A system that allows students to reserve a spot in a full course, subject to availability if another student drops the course.
- **User Role**: A designation for system access levels, such as student, registrar, or faculty member, each with different permissions within the system.
- **Concurrent Enrollment**: The ability for students to be enrolled in multiple courses during the same academic term. -->

## Overview
The Bingo Simulator and Calculator is a web-based application make the game of bingo accessible via any web browser. Organizers have the ability to host games with a wide variety of different game modes, and it is easy for a player to join and play
<!-- The Mahoney University Registration System is a web-based platform designed to automate the course registration process for students and faculty. It serves as the primary interface for students to manage their academic schedules and for university staff to oversee the course offerings and registration workflows. -->

### System Features:
1. **Secure Login**: Ensures that only authorized users under the database have the ability to create and select the games modes for games.
2. **Admin Interface**: Simple interface that shows options to create a game and select a game mode.
3. **Player Interface**: Players will be able to see that there in the lobby before the game starts, and once the game starts, they will see their bingo card and their current odds of winning

The system is designed with scalability in mind, allowing it to handle hundreds of players at once. 

The following sections detail the specific use cases that the system will support, describing how students and staff will interact with the system during typical operations.

## Use Cases

### Use Case 1.1: Calculate Win Percentage
- **Actors**: Server/Application
- **Overview**: The game calculation the current odds of the player winning based on the amount of players and/or the current progress of all the player's board

<!-- **Typical Course of Events**:
1. Page prompts for username and password.
2. User enters their username and password and hits enter/login.
3. System verifies that the username and password are correct.

**Alternative Courses**:
- **Step 3**: User and/or password are not correct.
  1. Displays error.
  2. Go back to step 1. -->

### Use Case 1.2: Players Join a Game Lobby
- **Actors**: Player
- **Overview**: Players use some sort of code to join a lobby associated with a game of bingo

<!-- **Typical Course of Events**:
1. Run Use Case 1.1, *Secure Login*.
2. Displays list of current and upcoming semesters.
3. Student selects a semester.
4. Displays departments actively offering courses in that semester.
5. Student selects a department.
6. Displays courses of that department from that semester that are currently offered.
7. Student selects a course.
8. Displays course details.

**Alternative Courses**:
- Any step: Student can start a new search at any time
  1. Student clicks "start new search."
  2. Go back to step 2. -->

### Use Case 1.3: Program plays out the game of Bingo
- **Actors**: Admin and Server/Application
- **Overview**: The game of Bingo plays out, with certain balls being called (automatically or manually), allowing players to mark of their cards based on numbers that have been called, and stopping when a player achieves bingo

<!-- **Typical Course of Events**:
1. Run Use Case 1.2, *Find a Course*.
2. Student clicks on "register for course" button.
3. Verify that student can take the course.
4. Display "You have successfully registered for 'insert course name here'."

**Alternative Courses**:
- **Step 4**: Student can't take course
  1. Displays "You cannot take this course, please contact the registrar for further information." -->

### Use Case 1.4: Players play Bingo
- **Actors**: Player
- **Overview**: The player marks of their card(s) based on numbers that have been called, and when they achieve bingo, it is "called out", manually or automatically 

<!-- **Typical Course of Events**:
1. Run Use Case 1.1, *Secure Login*.
2. Display previous semesters in which the student took course(s).
3. Student selects semester.
4. Displays courses and grades. -->

### Use Case 1.5: Alternate game modes 
- **Actors**: Admin and Application
- **Overview**: Abilty to choose between different way to play the game, such as blackout, four corners, ability to have more than one card, etc. 

<!-- **Typical Course of Events**:
1. Run Use Case 1.1, *Secure Login*.
2. Registrar selects "Create Section."
3. Display "Create Section" form.
4. Registrar submits form.
5. System verifies valid entry (no overlapping schedules/times).
6. Displays section details and successfully added.

**Alternative Courses**:
- **Step 6**: Entry invalid
  1. Display error.
  2. Go back to step 3. -->

### Use Case 1.6: Admin Login
- **Actors**: Admin and Application/Server
- **Overview**: An admin can sign in to the program, and can start new games and control can select game modes, play out the game of bingo, etc. 

<!-- **Typical Course of Events**:
1. Run Use Case 1.1, *Secure Login*.
2. Registrar selects "Modify section."
3. Displays all sections (with order options).
4. Choose section.
5. Display "Edit Form" with filled-in data.
6. Submit/verify data.
7. Display "Section successfully edited."

**Alternative Courses**:
- **Step 7**: Invalid Data
  1. Display Error.
  2. Go back to step 5. -->
