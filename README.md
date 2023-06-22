## TypingSpeed

Project on React.

The project allows train and test typing speed. All results are written to Local Storage, and can be selectively exported to a JSON file and imported back into programs.

You can select multiple programs for typing. You can type until the end of the selected number of characters *(time-end)*, or until the end of the selected amount of time *(time-end)*. You can also select the typing language *(available: en, ru, ua)*.

During printing, 3 fields will be displayed:
- Information about the current wound. Displays: current typing speed in characters per minute, typing accuracy, remaining time or characters.
- Field for typing. When entering a character, if it is correct, it is displayed in green, otherwise in green. There is a function to return to the previous character when clicking on `Backspace` to correct an error.
- Keyboard. The current keyboard layout is displayed. When you press a key, it displays which key is pressed.

You can also view the results statistics. It is displayed as a table. All available fields can be sorted in ascending and descending order by clicking on a specific column. You can select certain elements *(or all at the same time)*, and after that they can either be deleted or exported to JSON. You can also import them on this page.

By selecting an entry in the statistics or after a wound, you can view detailed information on the wound.

Added hover explanation for each element.

There are 3 pages:

- statistic;
- setup;
- typing;
- results.

Features:

- Project on React;
- Handling Error Routes;
- Hover explanation for each element
- Layout by methodology BEM.

Screenshots:

![typing-speed-1](https://github.com/SSSenia/typing-speed/assets/82032813/9722be94-dee5-419e-aabc-60a12d0f7bd3)
![typing-speed-2](https://github.com/SSSenia/typing-speed/assets/82032813/ba657ee6-bd44-4621-8770-530537607fde)
![typing-speed-3](https://github.com/SSSenia/typing-speed/assets/82032813/43e983db-8f06-479e-86ae-3c1217a04d92)
![typing-speed-4](https://github.com/SSSenia/typing-speed/assets/82032813/b58fe3d2-4c86-492f-8078-58d685a390ca)
