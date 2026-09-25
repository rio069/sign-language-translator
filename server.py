#!/usr/bin/env python3
"""
HandSpeak AI - Local Web Server Runner.
Launches the sign language translator web app and automatically opens it in your default browser.
Zero external dependencies required (uses Python standard library).
"""

import http.server
import socketserver
import webbrowser
import threading
import os
import sys

DEFAULT_PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS and no-cache headers for smooth local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress spammy asset logs, only log html/errors
        if self.path == '/' or self.path.endswith('.html'):
            sys.stdout.write(f"[{self.log_date_time_string()}] {args[0]} {args[1]}\n")

def find_available_port(start_port):
    import socket
    port = start_port
    while port < start_port + 50:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
        port += 1
    return start_port

def main():
    # Ensure working directory is the script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}"

    print("=" * 60)
    print(" 🤟 HandSpeak AI - Sign Language Translator & Guide")
    print("=" * 60)
    print(f" • Serving from: {script_dir}")
    print(f" • Web app URL:  {url}")
    print(" • Opening your browser automatically...")
    print(" • Press Ctrl+C in this terminal to stop the server.")
    print("=" * 60)

    # Automatically open browser after 0.5s
    def open_browser():
        webbrowser.open(url)

    threading.Timer(0.5, open_browser).start()

    # Allow address reuse to prevent 'Address already in use' errors
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[HandSpeak AI] Server stopped gracefully. Goodbye!")
        sys.exit(0)

if __name__ == '__main__':
    main()
