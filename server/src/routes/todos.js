import { todoService, VALID_STATUSES } from '../services/todoService.js';

function isValidDueDate(value) {
  if (value === null || value === undefined) return true;
  return !isNaN(Date.parse(value));
}

export default async function todosRoutes(fastify, options) {

  // GET /api/todos - Get all todos
  fastify.get('/', async (request, reply) => {
    return todoService.getAll();
  });

  // GET /api/todos/stats - Get aggregate stats
  fastify.get('/stats', async (request, reply) => {
    return todoService.getStats();
  });

  // GET /api/todos/:id - Get single todo
  fastify.get('/:id', async (request, reply) => {
    const todo = todoService.getById(request.params.id);
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return todo;
  });

  // POST /api/todos - Create new todo
  fastify.post('/', async (request, reply) => {
    const { title, status } = request.body;
    if (!title || !title.trim()) {
      return reply.status(400).send({ error: 'Title is required' });
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return reply.status(400).send({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    if ('dueDate' in request.body) {
      if (!isValidDueDate(request.body.dueDate)) {
        return reply.status(400).send({ error: 'Invalid dueDate format. Use ISO date string (e.g. 2026-06-15).' });
      }
    }
    const todo = todoService.create({ title: title.trim(), status, dueDate: request.body.dueDate });
    return reply.status(201).send(todo);
  });

  // PUT /api/todos/:id - Update todo
  fastify.put('/:id', async (request, reply) => {
    const { status } = request.body;
    if (status && !VALID_STATUSES.includes(status)) {
      return reply.status(400).send({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    if ('dueDate' in request.body) {
      if (!isValidDueDate(request.body.dueDate)) {
        return reply.status(400).send({ error: 'Invalid dueDate format. Use ISO date string (e.g. 2026-06-15).' });
      }
    }
    const todo = todoService.update(request.params.id, request.body);
    if (!todo) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return todo;
  });

  // DELETE /api/todos/:id - Delete todo
  fastify.delete('/:id', async (request, reply) => {
    const deleted = todoService.delete(request.params.id);
    if (!deleted) {
      return reply.status(404).send({ error: 'Todo not found' });
    }
    return { success: true };
  });
}
