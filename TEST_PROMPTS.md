# NovaAI Test Prompts

Use these prompts to test that your NovaAI chatbot is working correctly.

## Basic Functionality Tests

### 1. Uzbek Language Test
```
Salom
```
**Expected**: AI should greet you in Uzbek

```
Menga o'zing haqida ayt
```
**Expected**: AI should describe itself in Uzbek

```
2+2 nechchi?
```
**Expected**: AI should answer "4" in Uzbek

### 2. English Language Test
```
Hello
```
**Expected**: AI should greet you in English

```
What is JavaScript?
```
**Expected**: AI should explain JavaScript

```
Write a Python hello world program
```
**Expected**: AI should provide Python code with syntax highlighting

### 3. Russian Language Test
```
Привет
```
**Expected**: AI should greet you in Russian

```
Как дела?
```
**Expected**: AI should respond naturally in Russian

## Code Generation Tests

### Simple Code
```
Write a JavaScript function to add two numbers
```
**Expected**: Code block with syntax highlighting and copy button

### Complex Code
```
Create a React component for a button with hover effects
```
**Expected**: Complete React component with proper formatting

### Multiple Languages
```
Show me hello world in Python, JavaScript, and Java
```
**Expected**: Three separate code blocks with proper language labels

## Conversation Context Test

Send these messages in sequence:

1. `My name is Alex`
2. `What is my name?`

**Expected**: AI should remember your name from the previous message

## Markdown Rendering Tests

```
Show me a markdown example with:
- Bold text
- Italic text
- Code blocks
- Lists
- Links
```

**Expected**: AI response should render all markdown elements properly

## Error Handling Tests

### Empty Message
Try sending an empty message (should be prevented by UI)

### Long Message
Send a very long message (1000+ characters)
**Expected**: Should work without issues

### Network Error Simulation
Stop the backend server and try sending a message
**Expected**: Error message should appear: "AI bilan bog'lanishda muammo..."

## UI Feature Tests

### New Chat
1. Start a conversation
2. Click "New Chat" button
3. Verify previous chat is in history
4. Verify new chat is empty

### Search Conversations
1. Create several chats with different topics
2. Use search bar to find specific conversations
3. Verify search results are accurate

### Theme Switching
1. Open Settings
2. Switch between Light, Dark, and System themes
3. Verify theme changes immediately
4. Refresh page and verify theme persists

### Delete Conversation
1. Hover over a conversation in sidebar
2. Click delete icon
3. Confirm deletion
4. Verify conversation is removed

### Clear All History
1. Open Settings
2. Click "Clear All History"
3. Confirm action
4. Verify all conversations are deleted

## Mobile Responsiveness Tests

Test on different screen sizes:
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

**Expected**: UI should adapt smoothly to all screen sizes

## Performance Tests

### Message Speed
Send a message and measure response time
**Expected**: Response should start within 2-3 seconds

### Multiple Messages
Send 10 messages rapidly
**Expected**: All should be processed correctly

### Long Conversation
Have a conversation with 20+ messages
**Expected**: Should remain smooth, no lag

## Code Features Tests

### Copy Code Button
1. Request code from AI
2. Click "Copy" button on code block
3. Paste elsewhere
**Expected**: Code should be copied correctly

### Code Highlighting
Request code in different languages:
- Python
- JavaScript
- Java
- HTML
- CSS

**Expected**: Each should have appropriate syntax highlighting

## Example Test Conversation

Here's a complete test conversation:

```
User: Salom
AI: [Responds in Uzbek]

User: Can you help me with JavaScript?
AI: [Responds in English]

User: Write a function to reverse a string
AI: [Provides code with syntax highlighting]

User: Now make it work with Unicode characters
AI: [Provides improved code]

User: Thanks!
AI: [Responds naturally]
```

## Edge Cases

### Special Characters
```
Test with special chars: 你好 مرحبا 안녕하세요 🎉 🚀
```

### Code in Message
```
I have this code: const x = 5; how can I improve it?
```

### Multiple Questions
```
1. What is React?
2. What is Vue?
3. Which one should I learn?
```

## Production Readiness Checklist

Before going to production, verify:

- [ ] API key is NOT in frontend code
- [ ] .env file is in .gitignore
- [ ] Error messages are user-friendly
- [ ] All features work on mobile
- [ ] Theme switching works
- [ ] Conversation history persists
- [ ] Code blocks render correctly
- [ ] Markdown renders correctly
- [ ] Search works accurately
- [ ] Delete functions work
- [ ] Settings save correctly
- [ ] API errors are handled gracefully
- [ ] Loading states are clear
- [ ] Timestamps are accurate
- [ ] Multi-language support works

## Success Criteria

Your NovaAI chatbot is ready when:

✅ All language tests pass
✅ Code generation works with syntax highlighting
✅ Conversation context is maintained
✅ All UI features function correctly
✅ Theme switching works
✅ Mobile responsiveness is good
✅ Error handling is graceful
✅ API key is secure (server-side only)
✅ Performance is acceptable

---

Happy testing! 🚀
