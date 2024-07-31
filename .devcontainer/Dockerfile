FROM node:20-slim

# --------- Setup dependencies ---------

RUN npm i -g pnpm

# --------- Setup dev user ---------

# Install system applications for easier development
RUN apt update && apt install --no-install-recommends -y \
    sudo \
    git \
    ssh \
    curl \
    nano \
    zsh \
    inetutils-ping \
    wget \
    ca-certificates

# Change to zsh
RUN curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | bash - && \
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && \
  sed -i 's|plugins=(git)|plugins=(git docker zsh-autosuggestions zsh-syntax-highlighting)|g' ~/.zshrc && \
  sed -i 's|ZSH_THEME="robbyrussell"|ZSH_THEME="clean"|g' ~/.zshrc && \
  chsh -s $(which zsh)

# Change to Workspace
WORKDIR /workspace

EXPOSE 5173

