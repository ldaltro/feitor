# Scripts de Administração

## Criação de Conta Administrador

### Uso

```bash
# Em produção
NODE_ENV=production node scripts/create-admin.js

# Em desenvolvimento (com aviso)
node scripts/create-admin.js
```

### Segurança

- ✅ Senhas devem ter mínimo 12 caracteres
- ✅ Deve conter maiúsculas, minúsculas, números e caracteres especiais
- ✅ Confirmação de senha obrigatória
- ✅ Verificação de usuário duplicado
- ✅ Validação de email
- ✅ Entrada de senha oculta (asteriscos)
- ✅ Confirmação final antes da criação

### Auditoria

O script registra automaticamente a criação de contas admin para auditoria.

### Limitações

- Apenas um administrador por execução
- Não é possível editar informações após criação (use interface admin)
- Senha não pode ser recuperada (apenas redefinida)