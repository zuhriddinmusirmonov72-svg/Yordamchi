# Test Plan for NovaAI v1.2 Improvements

## 🧪 Complete Testing Guide

Test these scenarios to verify all improvements work correctly.

---

## Test 1: Conversation Context 🧠

### Scenario: Website Discussion
```
Step 1: Send "Men sayt yaratmoqchiman"
Expected: AI asks what type of website

Step 2: Send "Online do'kon"
Expected: AI understands you're talking about the website type
          Should not ask "what website?" again
```

### Scenario: Learning Topic
```
Step 1: Send "Men dasturlashni o'rganmoqchiman"
Expected: AI offers help with programming

Step 2: Send "Qayerdan boshlayman?"
Expected: AI understands question is about starting programming
          Should suggest beginner resources
```

### Scenario: Code Request Follow-up
```
Step 1: Send "Reactda button yarat"
Expected: AI provides React button code

Step 2: Send "Endi rangini o'zgartir"
Expected: AI modifies the button code with different color
          Understands "rangini" refers to the button
```

**✅ PASS if:** AI maintains context across messages
**❌ FAIL if:** AI treats each message independently

---

## Test 2: Language Detection 🌍

### Uzbek Test
```
Send: "Salom, menga yordam kerak"
Expected: Full response in Uzbek
Check: No Russian or English mixed in
```

### Russian Test
```
Send: "Привет, помоги мне с программированием"
Expected: Full response in Russian
Check: No Uzbek or English mixed in
```

### English Test
```
Send: "Hello, can you help me learn JavaScript?"
Expected: Full response in English
Check: No Uzbek or Russian mixed in
```

### Language Switching
```
Step 1: Send "Salom" (Uzbek)
Step 2: Send "Hello" (English)
Step 3: Send "Привет" (Russian)

Expected: AI responds in each respective language
          Switches seamlessly
```

**✅ PASS if:** AI responds in correct language every time
**❌ FAIL if:** Mixes languages or responds in wrong language

---

## Test 3: Edit Message ✏️

### Basic Edit
```
Step 1: Send "Men Python o'rganmoqchiman"
Step 2: Wait for AI response
Step 3: Hover over your message
Step 4: Click Edit button (pencil icon)
Step 5: Change to "Men JavaScript o'rganmoqchiman"
Step 6: Click "Save & Resend"

Expected:
- Textarea appears with your message
- Can edit the text
- Save & Cancel buttons visible
- After save, AI responds about JavaScript
- Previous AI response about Python is removed
```

### Edit Middle Message
```
Step 1: Send "Salom"
Step 2: Send "Men React o'rganmoqchiman"
Step 3: Send "Va Vue ham"
Step 4: Edit the second message: "Men Angular o'rganmoqchiman"

Expected:
- Third message ("Va Vue ham") is removed
- Only first message and edited message remain
- AI generates new response for Angular
```

**✅ PASS if:** 
- Edit button appears on hover
- Edit mode works
- Conversation continues from edit
- Messages after edit are removed

**❌ FAIL if:**
- Edit button not visible
- Changes don't save
- Conversation doesn't update

---

## Test 4: Regenerate Response 🔄

### Basic Regenerate
```
Step 1: Send "Menga o'zing haqida ayt"
Step 2: Wait for AI response
Step 3: Hover over AI message
Step 4: Click Regenerate button (circular arrow icon)

Expected:
- Previous AI response is removed
- New response is generated
- May be different from first response
```

### Multiple Regenerates
```
Step 1: Send any question
Step 2: Regenerate 3 times in a row

Expected:
- Each regenerate produces new response
- No errors
- Loading indicator shows each time
```

### Regenerate Only on Last Message
```
Step 1: Send 3 messages with responses
Step 2: Hover over first AI response
Step 3: Hover over second AI response

Expected:
- Regenerate button only on LAST AI response
- Not visible on earlier responses
```

**✅ PASS if:**
- Regenerate button visible on last AI message only
- Generates new response
- Previous response is replaced

**❌ FAIL if:**
- Button not visible
- Doesn't regenerate
- Shows error

---

## Test 5: Copy Messages 📋

### Copy User Message
```
Step 1: Send "Bu test xabari"
Step 2: Hover over your message
Step 3: Click Copy button

Expected:
- Button shows checkmark briefly
- Message copied to clipboard
- Can paste elsewhere
```

### Copy AI Message
```
Step 1: Send any question
Step 2: Wait for AI response
Step 3: Hover over AI message
Step 4: Click Copy button

Expected:
- AI message copied
- Includes all text including code blocks
```

### Copy Code Block
```
Step 1: Send "Write a Python hello world"
Step 2: AI provides code
Step 3: Click Copy on code block header

Expected:
- Only code is copied (not explanation)
- Proper formatting preserved
```

**✅ PASS if:** Copy works for all message types
**❌ FAIL if:** Copy fails or copies wrong content

---

## Test 6: Loading State 💫

### Check Loading Indicator
```
Step 1: Send a message
Step 2: Watch loading state

Expected:
- Shows "NovaAI is thinking..." text
- Animated spinner visible
- Message area remains responsive
- Can scroll while loading
```

### No Duplicate Messages
```
Step 1: Send message
Step 2: Quickly try to send another (should be disabled)

Expected:
- Second send blocked during loading
- No duplicate messages
- Clean error handling
```

**✅ PASS if:** 
- Loading text visible
- Spinner animates
- UI remains responsive

**❌ FAIL if:**
- Just shows spinner without text
- UI freezes
- Multiple messages send

---

## Test 7: Error Handling 📢

### Rate Limit (Hard to Test)
```
If you hit rate limit:
Expected message: "AI hozir juda ko'p so'rov qabul qilmoqda. Birozdan keyin qayta urinib ko'ring."
```

### Network Error
```
Step 1: Disconnect internet
Step 2: Send message

Expected:
- Friendly error message
- No crash
- Can retry after reconnecting
```

### Invalid API Key (Test in Dev Only)
```
Step 1: Temporarily set invalid API key
Step 2: Restart server
Step 3: Send message

Expected:
- Clear error message
- No exposed API key
- No technical stack trace
```

**✅ PASS if:** All errors show user-friendly messages
**❌ FAIL if:** Technical errors exposed to user

---

## Test 8: Smart Titles 📝

### Title from First Message
```
Step 1: Create new chat
Step 2: Send "Men React o'rganmoqchiman. Bu qiyin emasmi?"

Expected title: "Men React o'rganmoqchiman"
(First sentence, not full message)
```

### Short Message Title
```
Step 1: New chat
Step 2: Send "Salom"

Expected title: "Salom"
(No ellipsis for short messages)
```

### Long Message Title
```
Step 1: New chat
Step 2: Send very long message (100+ chars)

Expected title: First 40 chars + "..."
```

**✅ PASS if:** Titles are clean and readable
**❌ FAIL if:** Titles too long or cut awkwardly

---

## Test 9: UI/UX Improvements 🎨

### Action Buttons Visibility
```
Step 1: Send several messages
Step 2: Move mouse away from messages
Step 3: Hover over each message

Expected:
- Buttons invisible by default
- Appear smoothly on hover
- Fade out when mouse leaves
```

### Edit Mode UI
```
Step 1: Click Edit on any message
Expected:
- Textarea expands nicely
- Save & Cancel buttons clear
- Proper styling in dark/light mode
```

### Responsive Design
```
Test on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Expected:
- All features work on all sizes
- Buttons accessible
- Text readable
```

**✅ PASS if:** UI is polished and professional
**❌ FAIL if:** Buttons hard to see, UI glitchy

---

## Test 10: Complete Conversation Flow 🔄

### Full Scenario
```
Step 1: Create New Chat
Step 2: Send "Salom" → AI responds in Uzbek
Step 3: Send "Men sayt yaratmoqchiman" → AI asks type
Step 4: Send "Portfolio sayt" → AI gives suggestions
Step 5: Edit message 3 to "Online do'kon"
Step 6: AI responds about e-commerce
Step 7: Regenerate AI response
Step 8: Get different e-commerce advice
Step 9: Copy AI message
Step 10: Switch to new chat
Step 11: Previous chat saved with proper title

Expected:
- All steps work smoothly
- Context maintained throughout
- Edit changes conversation properly
- Regenerate produces new response
- Chat history preserved
```

**✅ PASS if:** Entire flow works perfectly
**❌ FAIL if:** Any step fails

---

## Test 11: Code Quality 💻

### Code Response Format
```
Send: "Write a React useState example"

Expected:
- Working code
- Proper syntax highlighting
- Language label visible
- Copy button works
- Code is practical and correct
```

### Code Explanation
```
Send: "Explain this code: const [count, setCount] = useState(0)"

Expected:
- Clear explanation
- Mentions React, hooks, state
- Not too long unless asked
```

**✅ PASS if:** Code examples are useful
**❌ FAIL if:** Code incorrect or poorly formatted

---

## Test 12: Performance ⚡

### Speed Test
```
Send 5 messages in sequence
Expected:
- Responses arrive within 2-5 seconds each
- No lag in UI
- Smooth scrolling
- No memory leaks
```

### Large Conversation
```
Create conversation with 50+ messages
Expected:
- Still fast
- Sidebar loads quickly
- No slowdown
- Messages render smoothly
```

**✅ PASS if:** App remains fast
**❌ FAIL if:** Noticeable lag or slowdown

---

## 📊 Final Checklist

Before marking as complete, verify:

- [ ] All existing features still work
- [ ] Conversation context maintained
- [ ] Language detection accurate
- [ ] Edit message works
- [ ] Regenerate works
- [ ] Copy works (all types)
- [ ] Loading state informative
- [ ] Error messages friendly
- [ ] Smart titles generated
- [ ] UI polished and smooth
- [ ] Mobile responsive
- [ ] Dark/Light themes work
- [ ] No console errors
- [ ] No broken features
- [ ] Performance acceptable

---

## 🎯 Success Criteria

**PASS:** ✅ 10+ out of 12 test categories pass completely

**PARTIAL:** ⚠️ 7-9 categories pass (needs minor fixes)

**FAIL:** ❌ <7 categories pass (needs major work)

---

## 📝 Bug Report Template

If you find issues:

```
**Test:** [Name of test]
**Expected:** [What should happen]
**Actual:** [What actually happened]
**Steps to Reproduce:**
1. 
2. 
3. 

**Screenshots:** [If applicable]
**Browser:** [Chrome/Firefox/Safari]
**Device:** [Desktop/Mobile]
```

---

**Happy Testing! 🧪**

Report results in GitHub issues or discussion.
