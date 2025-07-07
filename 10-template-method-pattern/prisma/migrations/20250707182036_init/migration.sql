-- CreateTable
CREATE TABLE "WebEvent" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgent" TEXT,
    "deviceType" TEXT NOT NULL,
    "browser" TEXT,
    "country" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "countryCode" TEXT,
    "isBot" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WebEvent_pkey" PRIMARY KEY ("id")
);
