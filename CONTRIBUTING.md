# Contributing to CyberHawk

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write tests for new functionality
5. Run tests: `pytest` (backend) or `npm test` (frontend)
6. Commit with descriptive message: `git commit -m 'Add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Code Style

### Python (Backend)

- Follow PEP 8
- Use type hints
- Max line length: 100 characters
- Use docstrings for functions/classes

```python
def detect_threat(log_content: str) -> Optional[Threat]:
    """
    Detect threats in log content using pattern matching.
    
    Args:
        log_content: The log content to analyze
        
    Returns:
        Threat object if detected, None otherwise
    """
    pass
```

### TypeScript/React (Frontend)

- Use TypeScript types
- Functional components with hooks
- Component naming: PascalCase
- File naming: same as component name

```typescript
interface AlertProps {
  id: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

const Alert: React.FC<AlertProps> = ({ id, severity }) => {
  return <div>{severity}</div>;
};
```

## Testing Requirements

- Backend: Minimum 80% code coverage
- Frontend: Unit tests for components
- All tests must pass before PR merge

Run tests:
```bash
# Backend
cd backend
pytest tests/ -v --cov=app

# Frontend
cd frontend
npm test
```

## Commit Messages

Follow conventional commits:
```
type(scope): short description

Longer explanation of changes

Fixes #123
```

Types: feat, fix, docs, style, refactor, test, chore

## Pull Request Process

1. Update README.md if needed
2. Update docs/ if adding features
3. Ensure all tests pass
4. Request review from maintainers
5. Address feedback and re-request review
6. Once approved, PR will be merged

## New Feature Checklist

- [ ] Code written and tested
- [ ] Unit tests added
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Performance impact assessed
- [ ] Security implications reviewed

## Reporting Issues

Use GitHub Issues with:
- Clear title
- Description of issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots/logs if applicable

## Security

Report security vulnerabilities to: security@cyberhawk.dev

Do not open public issues for security vulnerabilities.
