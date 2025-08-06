<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Angular Login Component - Copilot Instructions

Questo progetto è una libreria Angular riutilizzabile per componenti di login.

## Struttura del Progetto

- `projects/angular-login-component/` - Libreria principale
  - `src/lib/` - Codice sorgente della libreria
    - `login/` - Componente di login standalone
    - `models/` - Interfacce TypeScript
    - `auth.ts` - Servizio di autenticazione
    - `login.config.ts` - Configurazione e token DI

## Principi di Sviluppo

1. **Riutilizzabilità**: Il componente deve essere facilmente integrabile in qualsiasi progetto Angular
2. **Configurabilità**: Tutte le opzioni devono essere configurabili tramite variabili pubbliche
3. **Type Safety**: Utilizzare TypeScript rigorosamente con interfacce complete
4. **Standalone Components**: Supportare sia i moduli tradizionali che i componenti standalone
5. **Temi**: Supportare temi light, dark e custom
6. **Accessibilità**: Seguire le best practice per l'accessibilità
7. **Responsive**: Il design deve essere responsive

## Convenzioni

- Utilizzare PascalCase per i componenti
- Utilizzare camelCase per le proprietà
- Prefisso `lib-` per i selettori dei componenti
- Interfacce con suffisso appropriato (Config, Response, Request, etc.)
- Servizi con suffisso `Service`

## Best Practices

- Utilizzare OnPush change detection quando possibile
- Implementare OnDestroy per cleanup
- Utilizzare reactive forms
- Gestire gli errori in modo appropriato
- Fornire feedback visivo per le azioni dell'utente
- Utilizzare Observable per la gestione dello stato

## Angular Features da Utilizzare

- Dependency Injection con token personalizzati
- FormBuilder e ReactiveFormsModule
- HttpClient per le chiamate API
- RxJS operators per la gestione degli stream
- Angular standalone components
- ModuleWithProviders per la configurazione
