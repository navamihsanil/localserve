' Starts the LocalServe web server in the background (no window).
' To run it automatically at Windows login, put a copy of this file in
' the Startup folder (press Win+R, type  shell:startup  and press Enter).
Set sh = CreateObject("WScript.Shell")
sh.CurrentDirectory = "C:\Users\navam\OneDrive\Desktop\project"
sh.Run """C:\Program Files\nodejs\node.exe"" server.js", 0, False
