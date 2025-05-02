Deeto Frontend Challenge: Chatbot Checklist
## Application Requirements
### Core Functionality
[x] Display initial messages loaded from API
[x] Allow users to send new messages
[x] Display chatbot responses
[] Implement polling for responses
[] Proper asynchronous handling (polling for responses).
[] Component reusability for a flexible design.



## UI Components
[x] Chat container with message history (chat-container.tsx)
[x] Message bubbles for user and assistant (chat-message.tsx)
[x] Text input for sending messages (chat-input.tsx)
[x] Loading indicators for pending responses (chat-message.tsx)
[] Error handling for failed requests (chat-message.tsx)

## State Management
[x] Global state management with Zustand (chat-store.ts)
[x] Persist chat data across the application (chat-store.ts)
[x] Store settings from API (chat-store.ts)
[x] Manage loading states (chat-container.tsx)
[] Handle error states (chat-container.tsx)

## Styling
[x] Apply custom styles from API variables (chat-container.tsx)
[x] Responsive design 
[x] Visual distinction between user and assistant messages (chat-message.tsx)
[x] Animations for loading states (chat-message.tsx)
[] Hover effects for interactive elements

## API Integration
[x] Fetch chat configuration from GET endpoint (chat-container.tsx)
[x] Send messages to POST endpoint (chat-container.tsx)
[] Handle asynchronous responses (chat-container.tsx)
[] Error handling for API requests (chat-container.tsx)

## Code Quality
[x] TypeScript typing for all components and data
[x] Reusable component architecture (ui, chat)
[x] Clean project structure
[x] Proper separation of concerns
[x] Consistent code style

## Additional Features
[x] Display intro options after assistant messages (chat-container.tsx)
[x] Animated loading indicators (chat-message.tsx, chat-container.tsx)
[x] Custom theme variables (tailwind.config.ts)

## Technical Implementation
[x] React with TypeScript
[x] Next.js framework
[x] Zustand for state management
[x] Tailwind CSS for styling
[x] Server actions for API requests
[x] Proper error boundaries
[x] Use of shadcn/ui components

