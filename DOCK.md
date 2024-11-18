## How to Run RabbitMQ

To start RabbitMQ with the management UI, run this command:

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
