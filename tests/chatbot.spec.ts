import { test, expect } from '@playwright/test';

test.describe('AI Chatbot E2E Testing', () => {
  test('should receive a valid response from the AI backend', async ({ page }) => {
    // Navigate to the chatbot interface
    await page.goto('http://localhost:3000/chat');

    // Find the input field and type a prompt
    const input = page.locator('input[placeholder="Ask me anything..."]');
    await input.fill('What is the capital of Indonesia?');
    await input.press('Enter');

    // Wait for the AI response bubble to appear
    const aiResponse = page.locator('.ai-response-bubble').last();
    await expect(aiResponse).toBeVisible({ timeout: 10000 });
    
    // Verify the content of the response
    const text = await aiResponse.innerText();
    expect(text.toLowerCase()).toContain('jakarta');
  });
});