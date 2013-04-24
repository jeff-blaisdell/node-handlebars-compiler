@ECHO off
SETLOCAL

SET workspace=C:\dev\workspace
SET project=%workspace%\catalog
SET filewatcher=C:\dev\node-workspace\file-watcher
CD %filewatcher%
START cmd.exe /C node watch.js --watchdir %project%

ENDLOCAL