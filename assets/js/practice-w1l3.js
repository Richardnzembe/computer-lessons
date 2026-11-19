/* Week 1 · Lesson 3 — practice data: starting up, Windows and the desktop */
window.PRACTICE_DATA = {
  a1: {
    title: "What should you do?",
    options: ["Sign in", "Lock", "Sign out", "Sleep", "Restart", "Shut down"],
    items: [
      { text: "It is the start of your shift, the computer is switched off, and you are ready to begin work.", correct: 0, why: "Power on, then sign in with your own account so your files, settings and permissions are available." },
      { text: "You are leaving your desk for a ten-minute meeting and want to keep your work open.", correct: 1, why: "Lock the screen (Windows key + L). Your programs keep running, but nobody can see or change your work while you are away." },
      { text: "You have finished work for the day and will switch off the power at the wall.", correct: 5, why: "Shut down from Start → Power → Shut down. This closes programs safely before the power is cut." },
      { text: "A colleague needs to use the same computer under their own account.", correct: 2, why: "Sign out so your session and programs close and the colleague can sign in with their own username." },
      { text: "You are going for lunch and want to save electricity but keep your work open.", correct: 3, why: "Sleep uses very little power and restores your open programs when you wake the computer." },
      { text: "A program has frozen and the computer is no longer responding.", correct: 4, why: "Restart the computer. If possible, close the frozen program first; a restart clears the stuck state." }
    ]
  },
  a2: {
    title: "Name that part of the desktop",
    options: ["Start button", "Search", "Taskbar", "Notification area", "Desktop icons", "Recycle Bin"],
    items: [
      { text: "The button with the Windows logo that opens apps, settings and power options.", correct: 0, why: "The Start button opens the Start menu. In Windows 11 it sits in the centre of the taskbar by default." },
      { text: "The box where you type the name of an app, file or setting.", correct: 1, why: "The Search box searches apps, settings and files as you type." },
      { text: "The long bar across the bottom of the screen showing pinned and open apps.", correct: 2, why: "The taskbar holds the Start button, Search, pinned apps, open windows and the notification area." },
      { text: "The area at the right of the taskbar with the clock, network and volume.", correct: 3, why: "The notification area (system tray) shows the clock and status icons, and opens notifications." },
      { text: "The small pictures on the main screen that open programs or folders.", correct: 4, why: "Desktop icons are shortcuts to programs, folders and files. Double-click one to open it." },
      { text: "The place deleted files wait until you empty it.", correct: 5, why: "The Recycle Bin keeps deleted files until you restore them or empty it permanently." }
    ]
  },
  a3: {
    title: "Which button or shortcut?",
    options: ["Minimise", "Maximise", "Restore down", "Close", "Snap left / right", "Alt + Tab", "Task View", "Show desktop"],
    items: [
      { text: "Make the active window fill the whole screen.", correct: 1, why: "The Maximise button enlarges the window to fill the screen. Double-clicking the title bar does the same." },
      { text: "Hide the window in the taskbar without closing it.", correct: 0, why: "Minimise hides the window in the taskbar. The program keeps running and can be restored with one click." },
      { text: "Return a maximised window to its previous size.", correct: 2, why: "Restore down returns the window to the size and position it had before it was maximised." },
      { text: "End a program and remove its window from the screen.", correct: 3, why: "The Close button (X) closes the window and usually ends the program, asking you to save unsaved work first." },
      { text: "Place two windows side by side on the screen.", correct: 4, why: "Windows key + left arrow and Windows key + right arrow snap the active window to each half of the screen." },
      { text: "Switch quickly between open apps without using the mouse.", correct: 5, why: "Hold Alt and tap Tab to cycle through open windows; release Alt to switch to the highlighted one." },
      { text: "See all open windows and any extra desktops at once.", correct: 6, why: "Task View (Windows key + Tab) shows every open window and any virtual desktops you have created." },
      { text: "Reach the desktop without closing your apps.", correct: 7, why: "Show desktop (Windows key + D, or the thin button at the right of the taskbar) hides all windows so you can see the desktop." }
    ]
  }
};
