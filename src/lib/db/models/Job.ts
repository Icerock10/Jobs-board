import mongoose, { Model } from 'mongoose';
interface IJob {
  location: string;
  level: string;
}

const jobSchema = new mongoose.Schema({
  location: String,
  level: String,
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', jobSchema);
