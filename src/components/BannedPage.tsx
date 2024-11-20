import React from 'react';

export default function BannedPage() {
  return (
    <div 
      className="min-h-screen bg-red-100 flex flex-col items-center justify-center p-4"
      style={{ cursor: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDM2IDM2Ij48cGF0aCBmaWxsPSIjRkZBQzMzIiBkPSJNMzYgMThjMCA5Ljk0MS04LjA1OSAxOC0xOCAxOFMwIDI3Ljk0MSAwIDE4UzguMDU5IDAgMTggMHMxOCA4LjA1OSAxOCAxOCIvPjxwYXRoIGZpbGw9IiNGRkRDNUQiIGQ9Ik0yOS4yOCA2LjM2MkMyOC4xMjQgNS4yMTEgMjUuNTc2IDUgMjUuNTc2IDVzLTEwLjc2OSAyLjM0OC0xMi43OTIgMTAuOTk4Yy0uMTU3LjY3MS0uMjI5IDEuMzItLjI0MyAxLjk1Ny0xLjI1NyAxLjA5Ny0yLjczMSAyLjMtMy45OTkgMy45NTktMi4wMzEgMi42NjctLjY1MiA2LjUwMiAyLjc1MiA1LjYxMyAyLjA5LS41NDUgNC4wNzItMS4zNTIgNC4xNDMtLjEwOC4wNDUuNzk0LS43NDIgMS43ODUtLjc0MiAxLjc4NS44MzcuNTM2IDMuNjY1LjQ4OSA0LjUxNi0uNTQxLjQ1OC0uNTU1LjY1Mi0yLjQxMy42NTItMi40MTNzNC4yNjYtLjI0NCA0LjIxNS0xLjc4NWMtLjA1Mi0xLjU0LTIuNTI1LTIuMjQ4LTIuNTI1LTIuMjQ4czIuNDYxLTEuNTc0IDIuOTQzLTIuNDY0YzEuMjQyLTIuMjk4IDIuOTQyLTMuMzI4IDIuOTQyLTMuMzI4czIuMjg5LS43MTYgMy42NjktMi4wODJjMi4zOC0yLjM1OC0uNzQyLTUuODM1LS43NDItNS44MzV6Ii8+PHBhdGggZmlsbD0iI0VGOTY0NSIgZD0iTTI0LjM5NiAyNC4zNDhjLTEuMjM2LS43MjUtMy40NjIuMDc4LTMuNDYyLjA3OHMxLjM1Ny0yLjA5Ny4yMzEtMy4xNTZjLTEuMTI1LTEuMDYtMy4xMjEtLjI5Mi0zLjEyMS0uMjkycy43ODktMS40ODQtLjYyNy0yLjY0MWMtLjYwNC0uNDkzLTEuNjU2LS40NC0yLjQyOC0uMzE2IDAgMC0yLjA1Mi0yLjk0Mi00LjY4NS0xLjgzNiAwIDAtMi45MTEgMS4xMi0yLjE4MSA0LjIxMiAwIDAgLjI5OSAxLjE3MiAxLjQ5NyAyLjUxOCAxLjE5OCAxLjM0NiAzLjg2NCAyLjM3MiA0LjY4NSAyLjYxOS44MjEuMjQ3IDIuMzY2LjUzNiAyLjk5LjU5NS42MjQuMDU5IDIuNzE1LS4xNTYgMi43MTUtLjE1NnMyLjQxMi4zNzUgMy4xMjEtLjE4NWMuNzA5LS41NiAxLjI2NS0xLjQ0LjI2NS0xLjQ0eiIvPjxwYXRoIGZpbGw9IiNGRkFDMzMiIGQ9Ik0xMC43OTMgMjQuNjVjLS4zNzEtLjQxNi0uOTgyLS40MDEtMS4zNjQuMDMzLS4zODIuNDM0LS4zOTEgMS4xMjQtLjAyIDEuNTQuMzcxLjQxNiAxLjc3My44NzMgMi4xNTUuNDM5LjM4Mi0uNDM0LS40LTEuNTk2LS43NzEtMi4wMTJ6Ii8+PHBhdGggZmlsbD0iI0ZGQUMzMyIgZD0iTTEwLjc5MyAyNC42NWMtLjM3MS0uNDE2LS45ODItLjQwMS0xLjM2NC4wMzMtLjM4Mi40MzQtLjM5MSAxLjEyNC0uMDIgMS41NC4zNzEuNDE2IDEuNzczLjg3MyAyLjE1NS40MzkuMzgyLS40MzQtLjQtMS41OTYtLjc3MS0yLjAxMnoiLz48cGF0aCBmaWxsPSIjRkZBQzMzIiBkPSJNMTAuNzkzIDI0LjY1Yy0uMzcxLS40MTYtLjk4Mi0uNDAxLTEuMzY0LjAzMy0uMzgyLjQzNC0uMzkxIDEuMTI0LS4wMiAxLjU0LjM3MS40MTYgMS43NzMuODczIDIuMTU1LjQzOS4zODItLjQzNC0uNC0xLjU5Ni0uNzcxLTIuMDEyeiIvPjxwYXRoIGZpbGw9IiNGRkFDMzMiIGQ9Ik0xMC43OTMgMjQuNjVjLS4zNzEtLjQxNi0uOTgyLS40MDEtMS4zNjQuMDMzLS4zODIuNDM0LS4zOTEgMS4xMjQtLjAyIDEuNTQuMzcxLjQxNiAxLjc3My44NzMgMi4xNTUuNDM5LjM4Mi0uNDM0LS40LTEuNTk2LS43NzEtMi4wMTJ6Ii8+PHBhdGggZmlsbD0iI0ZGQUMzMyIgZD0iTTEwLjc5MyAyNC42NWMtLjM3MS0uNDE2LS45ODItLjQwMS0xLjM2NC4wMzMtLjM4Mi40MzQtLjM5MSAxLjEyNC0uMDIgMS41NC4zNzEuNDE2IDEuNzczLjg3MyAyLjE1NS40MzkuMzgyLS40MzQtLjQtMS41OTYtLjc3MS0yLjAxMnoiLz48cGF0aCBmaWxsPSIjRkZBQzMzIiBkPSJNMTAuNzkzIDI0LjY1Yy0uMzcxLS40MTYtLjk4Mi0uNDAxLTEuMzY0LjAzMy0uMzgyLjQzNC0uMzkxIDEuMTI0LS4wMiAxLjU0LjM3MS40MTYgMS43NzMuODczIDIuMTU1LjQzOS4zODItLjQzNC0uNC0xLjU5Ni0uNzcxLTIuMDEyeiIvPjxwYXRoIGZpbGw9IiNGRkFDMzMiIGQ9Ik0xMC43OTMgMjQuNjVjLS4zNzEtLjQxNi0uOTgyLS40MDEtMS4zNjQuMDMzLS4zODIuNDM0LS4zOTEgMS4xMjQtLjAyIDEuNTQuMzcxLjQxNiAxLjc3My44NzMgMi4xNTUuNDM5LjM4Mi0uNDM0LS40LTEuNTk2LS43NzEtMi4wMTJ6Ii8+PC9zdmc+), auto' }}
    >
      <div className="text-9xl mb-8">🤡</div>
      <h1 className="text-6xl font-bold text-red-600 mb-4">BANNED BOZO!</h1>
      <p className="text-xl text-red-500">Pas de devoirs inutiles ici!</p>
    </div>
  );
}