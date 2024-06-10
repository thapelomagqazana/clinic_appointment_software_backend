# Define an array of test files
$testFiles = @(
    "tests/appointment.test.js",
    "tests/schedule.test.js",
    "tests/notification.test.js"
)

# Loop through each test file
foreach ($file in $testFiles) {
    # Run the test for the current file
    Write-Output "Running test for file: $file"
    npx jest $file

    # Add a time delay (e.g., 1 second) before running the next test
    Start-Sleep -Seconds 1
}