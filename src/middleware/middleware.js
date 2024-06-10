import cors from 'cors'
import { logger } from 'logger-express'
import express from 'express'

export const corsMiddleware = (_, res, next) => {
  cors()
  next()
}
export const jsonMiddleware = (_, res, next) => {
  express.json()
  next()
}
export const loggerMiddleware = (_, res, next) => {
  logger()
  next()
}
