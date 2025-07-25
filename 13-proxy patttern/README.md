
# Proxy Pattern – Video Processing Example

This project is part of my Head First Design Patterns (HFDP) learning journey, specifically demonstrating Chapter 11's Proxy Pattern in a real-world scenario.

## 🎯 Overview

Instead of the classic "Image Proxy" example from HFDP, this project implements the Proxy Pattern in a **video processing API** context. It demonstrates how different types of proxies (Protection, Virtual, and Remote) can be combined to secure, optimize, and simplify interactions between a client and a server.

* **Server-side**: Implements a **Protection Proxy** that enforces API key validation and request quotas per user.
* **Client-side**: Implements both a **Virtual Proxy** and a **Remote Proxy**:

  * **Remote Proxy**: Wraps all HTTP API calls to the server, providing the same interface as the server’s `VideoProcessingService`.
  * **Virtual Proxy**: Lazily creates a user and retrieves an API key on first use, then caches and applies it to all requests.

This setup allows the client to use the service as if it were local, while handling authentication, request limits, and remote communication transparently.

## 🏗️ Project Structure

```
13-proxy-pattern/
├── server/
│   ├── src/user/                     # Protection proxy: API key validation & quota
│   │   ├── guard/api-key.guard.ts
│   │   ├── proxy/user-service.proxy.ts
│   │   └── user.service.ts
│   └── src/video-processing/         # Real service implementation
│       ├── video-processing.service.ts
│       └── video-processing.controller.ts
└── client/
    ├── src/video-processing/
    │   ├── proxy/video-processing-api.proxy.ts       # Remote proxy (HTTP calls)
    │   └── proxy/video-processing-lazy-api-proxy.ts  # Virtual proxy (lazy init)
    └── main.ts                                      # Demo driver code
```

## 🎨 Design Pattern Implementation

### Proxy Pattern Components:

1. **Real Subject** (`VideoProcessingService`)

   * Implements actual video upload, crop, resize, compress, slow, and fasten operations.
   * Exposes CRUD operations for managing uploaded videos.

2. **Protection Proxy** (`UserServiceProxy` on server)

   * Wraps `UserService` and enforces:

     * API key validation
     * Daily request quotas for free users
   * Used by an API guard to secure endpoints.

3. **Remote Proxy** (`VideoProcessingApiProxy` on client)

   * Implements the same interface as `VideoProcessingService`.
   * Communicates with the server over HTTP using Axios.
   * Handles file uploads, downloads, and data serialization.

4. **Virtual Proxy** (`VideoProcessingLazyApiProxy` on client)

   * Lazily creates a user and retrieves an API key upon first use.
   * Injects the API key into all subsequent HTTP requests.
   * Shields client code from authentication and lifecycle management.

## 🚀 Getting Started

### Prerequisites

* [NestJS](https://nestjs.com/) installed globally
* Node.js 16+ (for TypeScript support)
* ffmpeg installed (for video processing)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies for both server and client
cd 13-proxy-pattern/server && yarn install
cd ../client && yarn install
```

### Running the Demo

```bash
# Start the server
cd server
yarn start:dev

# In another terminal, run the client demo
cd ../client
yarn start:dev
```

## 💡 Usage Examples

The client runs a demonstration of the proxy pattern:

1. **Uploads** a sample video (`video-stub.mp4`) from `data/`.
2. Performs all 5 operations: crop, resize, compress, slow, and fasten.
3. **Downloads** the processed videos to the `downloads/` folder.
4. Attempts to upload again, which fails because the free user has exceeded the daily request quota enforced by the **Protection Proxy**.

### Client Code (simplified)

```typescript
const service = app.get(VideoProcessingService);

const uploaded = await service.uploadVideo('./data/video-stub.mp4');

await service.crop({ videoId: uploaded.id, ... });
await service.resize({ videoId: uploaded.id, ... });
// ... other operations

await service.download({ videoId: uploaded.id, jobId: job.id }, './downloads/result.mp4');
```

## 🔍 Key Learning Points

1. **Why Protection Proxy over just a guard?**

   * The proxy encapsulates API key validation and quota logic within the `UserServiceProxy`, ensuring that all service methods are protected consistently.
     Guards alone protect controllers but cannot enforce constraints deep in the service layer.

2. **Why Virtual Proxy on the client?**

   * Lazily creates a user and fetches an API key on the first request.
   * Eliminates manual API key management in client code.

3. **Why Remote Proxy on the client?**

   * Provides the same interface as the server’s service.
   * Handles all HTTP calls, request headers, and serialization transparently.

4. **Combined effect:**

   * Client code uses a simple service interface.
   * Authentication, request limits, and network details are all abstracted away.

## 📝 Notes

* This is a simulated implementation for learning purposes.
* Real video processing would require actual FFmpeg operations and persistent storage.
* Error handling and validation are simplified.
* Comments in the code indicate where to add real implementation logic.

## 🤝 Contributing

Feel free to use this as a learning resource or extend it with:

* More advanced quota management
* Authentication/authorization providers
* Additional video operations
* Unit and e2e tests

## 📚 Related HFDP Concepts

* Proxy Pattern basics
* Protection, Virtual, and Remote Proxies
* Separation of concerns
* Encapsulation of access control and resource-intensive operations

## 📄 License

MIT

