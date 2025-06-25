#!/bin/bash

# 3D Portfolio Deployment Script
# This script helps deploy the portfolio to various hosting platforms

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="3d-portfolio"
VERSION="2.0.0"
AUTHOR="Soumyadip Saha"

echo -e "${BLUE}🚀 3D Portfolio Deployment Script${NC}"
echo -e "${BLUE}Version: ${VERSION}${NC}"
echo -e "${BLUE}Author: ${AUTHOR}${NC}"
echo ""

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required files exist
check_files() {
    print_info "Checking required files..."
    
    required_files=("index.html" "CSS/style.css" "JS/main.js" "README.md")
    
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            print_status "Found $file"
        else
            print_error "Missing required file: $file"
            exit 1
        fi
    done
    
    print_status "All required files found"
}

# Validate HTML
validate_html() {
    print_info "Validating HTML structure..."
    
    if command -v tidy &> /dev/null; then
        tidy -q -e index.html
        print_status "HTML validation completed"
    else
        print_warning "HTML tidy not found, skipping validation"
    fi
}

# Optimize images (if ImageMagick is available)
optimize_images() {
    print_info "Optimizing images..."
    
    if command -v convert &> /dev/null; then
        if [ -d "assets/images" ]; then
            for img in assets/images/*.{jpg,jpeg,png}; do
                if [ -f "$img" ]; then
                    convert "$img" -strip -quality 85 "$img"
                    print_status "Optimized $img"
                fi
            done
        fi
        print_status "Image optimization completed"
    else
        print_warning "ImageMagick not found, skipping image optimization"
    fi
}

# Create deployment package
create_package() {
    print_info "Creating deployment package..."
    
    # Create dist directory
    mkdir -p dist
    
    # Copy files to dist
    cp -r index.html CSS JS assets README.md package.json dist/
    
    # Create .nojekyll for GitHub Pages
    touch dist/.nojekyll
    
    print_status "Deployment package created in dist/ directory"
}

# Deploy to GitHub Pages
deploy_github_pages() {
    print_info "Deploying to GitHub Pages..."
    
    if [ -d ".git" ]; then
        # Check if gh-pages branch exists
        if git show-ref --verify --quiet refs/heads/gh-pages; then
            git checkout gh-pages
        else
            git checkout -b gh-pages
        fi
        
        # Copy dist contents to root
        cp -r dist/* .
        
        # Add and commit changes
        git add .
        git commit -m "Deploy version $VERSION - $(date)"
        
        # Push to GitHub
        git push origin gh-pages
        
        # Return to main branch
        git checkout main
        
        print_status "Deployed to GitHub Pages"
        print_info "Your site will be available at: https://yourusername.github.io/$PROJECT_NAME"
    else
        print_error "Not a git repository. Please initialize git and add remote origin."
    fi
}

# Deploy to Netlify
deploy_netlify() {
    print_info "Deploying to Netlify..."
    
    if command -v netlify &> /dev/null; then
        netlify deploy --prod --dir=dist
        print_status "Deployed to Netlify"
    else
        print_warning "Netlify CLI not found. Please install it first: npm install -g netlify-cli"
    fi
}

# Deploy to Vercel
deploy_vercel() {
    print_info "Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        print_status "Deployed to Vercel"
    else
        print_warning "Vercel CLI not found. Please install it first: npm install -g vercel"
    fi
}

# Local development server
start_dev_server() {
    print_info "Starting development server..."
    
    if command -v python3 &> /dev/null; then
        print_info "Starting Python HTTP server on port 8000..."
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        print_info "Starting Python HTTP server on port 8000..."
        python -m http.server 8000
    elif command -v npx &> /dev/null; then
        print_info "Starting Node.js server on port 8000..."
        npx serve . -p 8000
    else
        print_error "No suitable server found. Please install Python or Node.js."
    fi
}

# Show help
show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  check     - Check required files and validate structure"
    echo "  optimize  - Optimize images and validate HTML"
    echo "  package   - Create deployment package"
    echo "  github    - Deploy to GitHub Pages"
    echo "  netlify   - Deploy to Netlify"
    echo "  vercel    - Deploy to Vercel"
    echo "  dev       - Start local development server"
    echo "  all       - Run all deployment steps"
    echo "  help      - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 check     # Check files and validate"
    echo "  $0 package   # Create deployment package"
    echo "  $0 github    # Deploy to GitHub Pages"
    echo "  $0 dev       # Start development server"
}

# Main script logic
case "${1:-help}" in
    "check")
        check_files
        validate_html
        ;;
    "optimize")
        check_files
        validate_html
        optimize_images
        ;;
    "package")
        check_files
        validate_html
        optimize_images
        create_package
        ;;
    "github")
        check_files
        validate_html
        optimize_images
        create_package
        deploy_github_pages
        ;;
    "netlify")
        check_files
        validate_html
        optimize_images
        create_package
        deploy_netlify
        ;;
    "vercel")
        check_files
        validate_html
        optimize_images
        create_package
        deploy_vercel
        ;;
    "dev")
        start_dev_server
        ;;
    "all")
        check_files
        validate_html
        optimize_images
        create_package
        print_info "Deployment package ready. Choose your deployment platform:"
        echo "1. GitHub Pages"
        echo "2. Netlify"
        echo "3. Vercel"
        echo "4. Manual deployment"
        ;;
    "help"|*)
        show_help
        ;;
esac

echo ""
print_status "Deployment script completed!" 