## Architectural Blueprint (Sim-CBT Refined)

1. **Reference Standard**: All UI and logic must strictly adhere to the patterns defined in `CBT_EXAM_STRUCTURE.md` (TCS iON/NTA style).

2. **Tech Stack**: React (TypeScript) + Vite.

3. **Styling**: Tailwind CSS (v4). Use semantic theme variables from `index.css`.

4. **Data Driven**: The application is driven by `src/questions.json`. Any schema changes must be reflected in `types.ts`.

5. **State Engine**: 
   - Global state is managed via **React Context** (`ExamContext.tsx`).
   - The "Status Matrix" (5-color coding) logic resides within the context provider.
   - Use the `useExam` hook to access exam state and actions in any component.

6. **Directory Structure (Expansion-Ready)**:
   - `src/context/`: Global state providers.
   - `src/pages/`: Top-level route components (e.g., `ExamTerminal`, `InstructionsPage`).
   - `src/components/`: Modular, reusable UI components.
   - `src/types/`: TypeScript interfaces and type definitions.
   - `src/features/`: (Future) Encapsulated complex features like `VirtualKeypad` or `ImageZoom`.

7. **Component Standards**:
   - Avoid "prop drilling"; use Context for deeply nested state.
   - Components should be functional and utilize hooks.
   - UI components should be isolated from business logic where possible.

8. **Security Integrations**: Locked-down "Kiosk" features (blocking right-click, shortcuts) are core requirements. Implement these at the Page level or via custom hooks.

## Lifecycle & Process Principles

- **Always use a virtual environment**. Never install packages globally.
- **Modularity First**: Build components to be easily replaceable or expandable.
- **Server Persistence**: Every "Save" action should simulate an API call for data integrity.
- **Maintainability**: Write self-documenting code with consistent style.

## Enforcement Directives

- Reject code that violates readability, clarity, or established CBT structure.
- When multiple solutions exist, select the one that is **simplest, most maintainable, and least surprising**.
- Use the `Start-CBT-Simulator.ps1` script for one-click development startup.
