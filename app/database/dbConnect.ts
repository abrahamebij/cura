import mongoose, { Mongoose } from "mongoose";

interface MongooseGlobal {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Augment Node.js global type only if not already defined
  // eslint-disable-next-line no-var
  var mongoose: MongooseGlobal;
}

const cached: MongooseGlobal = globalThis.mongoose || {
  conn: null,
  promise: null,
};

globalThis.mongoose = cached;

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGO_URI as string, opts)
      .then((mongooseInstance) => {
        console.log("Connected to Database");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
