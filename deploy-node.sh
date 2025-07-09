#!/bin/bash
set -e

##############################
# Step 0: Get Package Name
##############################
PACKAGE_NAME=$(node -p "require('./package.json').name")

if [ -z "$PACKAGE_NAME" ]; then
  echo "Error: Could not determine package name from package.json."
  exit 1
fi

TARGET_PATH="/home/node/.n8n/custom/$PACKAGE_NAME"

echo "Detected package name: '$PACKAGE_NAME'"
echo "Target path inside container: '$TARGET_PATH'"

##############################
# Step 1: Build the Node
##############################
echo "Building the node..."
pnpm run build

##############################
# Step 2: Copy to Container
##############################
CONTAINER_NAME="n8n"
SOURCE_DIR="./dist"

echo "Copying build output to container '$CONTAINER_NAME' at '$TARGET_PATH'..."

# Create target dir inside container
docker exec -u node "$CONTAINER_NAME" mkdir -p "$TARGET_PATH"

# Copy all files from dist/ into the container
tar -cf - -C "$SOURCE_DIR" . | docker exec -u node -i "$CONTAINER_NAME" tar -xf - -C "$TARGET_PATH"

echo "Files copied successfully."

##############################
# Step 3: Restart n8n
##############################
echo "Restarting container '$CONTAINER_NAME'..."
docker restart "$CONTAINER_NAME"
sleep 5
echo "Watching logs:"
docker logs -f "$CONTAINER_NAME"
