from playwright.sync_api import sync_playwright, Page, expect

def test_registration_page(page: Page):
    """
    This test verifies that the registration page loads correctly.
    """
    # 1. Arrange: Go to the registration page.
    # The frontend dev server should be running on port 3000.
    page.goto("http://localhost:3000/register")

    # 2. Assert: Check that the main heading is visible.
    # This confirms the page has loaded before we take the screenshot.
    heading = page.get_by_role("heading", name="Register")
    expect(heading).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/registration.png")

# Boilerplate to run the test
if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_registration_page(page)
        browser.close()