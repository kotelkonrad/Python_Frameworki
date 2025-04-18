class GzipHeaderMiddleware:
    """
    Ensure that requests for .gz files get the correct
    Content-Encoding and Content-Type headers if WhiteNoise
    hasn’t already set them.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        path = request.path.lower()
        if path.endswith(".js.gz"):
            response["Content-Encoding"] = "gzip"
            response["Content-Type"]     = "application/javascript"
        elif path.endswith(".data.gz"):
            response["Content-Encoding"] = "gzip"
            response["Content-Type"]     = "application/octet-stream"
        return response