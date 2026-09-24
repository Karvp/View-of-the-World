<?php
declare(strict_types=1);
header('Content-Type: application/manifest+json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
readfile(__DIR__ . '/manifest.webmanifest');
