import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Worker } from '../../workers/entities/worker.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class WorkerRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Worker, (worker) => worker.roles)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @ManyToOne(() => Role, (role) => role.workers)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  worker_id: number;

  @Column()
  role_id: number;
}
