cd ../client
call npm install
cd ../server
call npm install
IF NOT EXIST ".env" (
  echo F | xcopy .env.example .env
  echo =============================================================================================
  echo .env file was created. Make sure that you add a mongoDB address or else program will not work.
  echo =============================================================================================
)
npm run production
@pause