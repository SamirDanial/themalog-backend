import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TemperatureService } from './temperature.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // or your front-end app's URL
    methods: ['GET', 'POST'],
  },
})
export class TemperatureGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emitTemperatureUpdate(newTemperature: any) {
    this.server.emit('temperatureUpdate', newTemperature);
  }
}
