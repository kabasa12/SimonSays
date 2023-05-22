# Simon Says Game

The Simon Says Game is a mobile app built using React Native, Redux Toolkit, Hooks, and TypeScript. It consists of two screens: the Game screen and the Results screen. The app allows users to play the Simon Says game, where they have to repeat a sequence of colored buttons generated by the app.

## Screens

### User Screen

The User screen includes the following:

- A text input to enter the player name
- A submit button that stay disable until the user enter his name

### Game Screen

The Game screen features the following elements:

- Four colored buttons representing the gameplay.
- A Start button to begin the game.
- A display showing the current score, indicating the length of the active sequence.

### Results Screen

The Results screen includes the following components:

- A list of the top 10 best results, displaying the player's name and score.
- A button to start a new game.

## Behavior Specifications

The Simon Says game follows these specifications:

- The sequence of button presses generated by Simon is random, with each step adding a random color.
- The sequence increases by 1 for every successful attempt by the player.
- If the user fails to repeat the sequence correctly, they are redirected to the Results screen and prompted to enter their name using a modal.
- The results, including player names and scores, are persistent and retained even when the app is reopened.
- Sound effects are included for both Simon's button presses and the user's button presses.

## Technical Guidelines

- The app is built using the React Native CLI Quickstart, not Expo.
- TypeScript is used for type-checking and providing static types.
- Hooks are used for state management and component logic.
- Redux is utilized for managing the app's global state using Redux Toolkit.
- Navigation within the app is implemented using react-navigation v5.

## Getting Started

To run the Simon Says Game app locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the Metro bundler: `npx react-native start`
4. Run the app on a connected device or emulator:
   - For Android: `npx react-native run-android`
   - For iOS: `npx react-native run-ios`

Make sure you have the required setup for React Native development, including the necessary Android SDK or Xcode installation.