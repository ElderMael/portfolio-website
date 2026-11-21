FROM nginx:alpine@sha256:fb4658584bd9a916ffb6f6e365f97c25cfdb2923801f551ea08356e695f14ff7

# Prepare writable nginx runtime directories before dropping privileges.
RUN chown -R nginx:nginx /var/cache/nginx

# Run as the nginx account's numeric UID for Kubernetes runAsNonRoot checks.
USER 101:101

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets with correct ownership
COPY --chown=nginx:nginx ./build /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]